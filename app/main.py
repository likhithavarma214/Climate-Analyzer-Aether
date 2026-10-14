"""AETHER same-origin API, weather cache and persisted Python analyses."""
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import csv
import hashlib
import io
import json
import os
import threading
import time
from collections import OrderedDict, deque
from contextlib import asynccontextmanager
from datetime import date, datetime, timezone
from pathlib import Path
from typing import Literal
from xml.sax.saxutils import escape

import httpx
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import FileResponse, Response
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field, model_validator
from tinydb import Query, TinyDB
from .analysis import analyze

BASE = Path(__file__).parent
DATA = Path(os.getenv('DATA_DIR', BASE.parent / 'data'))
DATA.mkdir(parents=True, exist_ok=True)
TTL = 30 * 86400
_store_lock = threading.RLock()
_db = TinyDB(DATA / 'documents.json')
_mongo = None
limits = OrderedDict()
_gate = asyncio.Semaphore(3)


def get_doc(kind, key):
    with _store_lock:
        if _mongo is not None:
            return _mongo[kind].find_one({'key': key}, {'_id': 0})
        return _db.table(kind).get(Query().key == key)


def put_doc(kind, key, data):
    doc = {'key': key, 'created': time.time(), 'data': data}
    with _store_lock:
        if _mongo is not None:
            _mongo[kind].replace_one({'key': key}, doc, upsert=True)
        else:
            _db.table(kind).upsert(doc, Query().key == key)
    return doc


@asynccontextmanager
async def lifespan(app):
    global _mongo
    client = None
    if os.getenv('MONGODB_URI'):
        from pymongo import MongoClient
        client = MongoClient(os.environ['MONGODB_URI'], serverSelectionTimeoutMS=5000)
        await asyncio.to_thread(client.admin.command, 'ping')
        _mongo = client.aether
        for collection in ['weather', 'analyses']:
            await asyncio.to_thread(_mongo[collection].create_index, 'key', unique=True)
    yield
    if client:
        client.close()
    _db.close()


app = FastAPI(title='AETHER Climate API', version='2.0.0', lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://climate-analyzer-aether.vercel.app",
        "https://climate-analyzer-aether-git-main-likhitha-v-projects.vercel.app",
    ],
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)


class Region(BaseModel):
    name: str = Field(default='Custom location', min_length=1, max_length=120)
    country: str | None = Field(default=None, min_length=1, max_length=80)
    state: str | None = Field(default=None, min_length=1, max_length=80)
    city: str | None = Field(default=None, min_length=1, max_length=80)
    lat: float = Field(ge=-90, le=90, allow_inf_nan=False)
    lon: float = Field(ge=-180, le=180, allow_inf_nan=False)


class AnalysisRequest(BaseModel):
    region: Region
    hazard: Literal['heat', 'rain', 'dry'] = 'heat'
    start: int = Field(default=1990, ge=1940)
    end: int = Field(default_factory=lambda: date.today().year - 1, ge=1940)
    mode: Literal['backend'] = 'backend'
    @model_validator(mode='after')
    def years(self):
        if self.end >= date.today().year or self.end - self.start < 2:
            raise ValueError('Choose at least three full calendar years ending before the current year.')
        return self


@app.middleware('http')
async def security(request: Request, call_next):
    if request.url.path.startswith('/api/'):
        try:
            if int(request.headers.get('content-length', '0')) > 1024 * 1024:
                return Response('Request exceeds 1 MB.', 413)
        except ValueError:
            return Response('Invalid content length.', 400)
        group = 'write' if request.method == 'POST' else 'read'
        key = ((request.client.host if request.client else 'unknown'), group)
        now = time.monotonic()
        q = limits.setdefault(key, deque()); limits.move_to_end(key)
        while q and q[0] < now - 60:
            q.popleft()
        if len(q) >= (8 if group == 'write' else 120):
            return Response('Rate limit reached. Please retry in a minute.', 429, headers={'Retry-After': '60'})
        q.append(now)
        while len(limits) > 10000:
            limits.popitem(last=False)
    response = await call_next(request)
    if request.url.path in ['/', '/api/health']:
        response.headers['Cache-Control'] = 'no-store'
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    return response


@app.get('/api/health')
async def health():
    try:
        if _mongo is not None:
            await asyncio.to_thread(_mongo.command, 'ping')
        else:
            await asyncio.to_thread(get_doc, 'health', 'probe')
    except Exception as exc:
        raise HTTPException(503, 'Database unavailable') from exc
    return {'app': 'aether-climate', 'instance': os.getenv('AETHER_LAUNCH_ID'), 'status': 'ok', 'storage': 'MongoDB' if _mongo is not None else 'TinyDB', 'version': '2.0.0'}


async def weather(config):
    first, last = min(1961, config.start), max(1990, config.end)
    key = hashlib.sha256(f'era5-v2:{config.region.lat:.4f}:{config.region.lon:.4f}:{first}:{last}'.encode()).hexdigest()
    cached = await asyncio.to_thread(get_doc, 'weather', key)
    if cached and time.time() - cached['created'] < TTL:
        return dict(cached['data'], weatherCached=True)
    params = {'latitude': config.region.lat, 'longitude': config.region.lon,
              'start_date': f'{first}-01-01', 'end_date': f'{last}-12-31',
              'daily': 'temperature_2m_max,precipitation_sum', 'models': 'era5',
              'timezone': 'GMT', 'temperature_unit': 'celsius', 'precipitation_unit': 'mm'}
    try:
        async with httpx.AsyncClient(timeout=100, follow_redirects=False) as client:
            async with asyncio.timeout(115):
                for attempt in range(3):
                    response = await client.get('https://archive-api.open-meteo.com/v1/archive', params=params)
                    if response.status_code not in [429, 500, 502, 503, 504]:
                        break
                    if attempt < 2:
                        await asyncio.sleep(2 ** attempt)
                response.raise_for_status()
                raw = response.json(); daily = raw['daily']
                ds, ts, ps = daily['time'], daily['temperature_2m_max'], daily['precipitation_sum']
                if not all(isinstance(x, list) for x in [ds, ts, ps]) or not (len(ds) == len(ts) == len(ps)):
                    raise ValueError('Mismatched arrays')
                if raw.get('daily_units', {}).get('temperature_2m_max') not in ['°C', 'C'] or raw.get('daily_units', {}).get('precipitation_sum') != 'mm':
                    raise ValueError('Unexpected weather units')
                data = {'rows': [{'date': d, 't': t, 'p': p} for d, t, p in zip(ds, ts, ps)],
                        'source': 'Open-Meteo / ERA5', 'fetchedAt': datetime.now(timezone.utc).isoformat(),
                        'timezone': raw.get('timezone', 'GMT'), 'grid': {'lat': raw.get('latitude'), 'lon': raw.get('longitude')},
                        'url': str(response.url)}
    except (httpx.HTTPError, TimeoutError, ValueError, KeyError, TypeError) as exc:
        raise HTTPException(502, 'Weather provider unavailable or returned invalid data. Retry later. No simulated data was substituted.') from exc
    await asyncio.to_thread(put_doc, 'weather', key, data)
    return dict(data, weatherCached=False)


@app.post('/api/analyses')
async def create_analysis(config: AnalysisRequest):
    params = config.model_dump()
    key = hashlib.sha256(('method-v2:' + json.dumps(params, sort_keys=True)).encode()).hexdigest()
    async with _gate:
        doc = await asyncio.to_thread(get_doc, 'analyses', key)
        if doc and time.time() - doc['created'] < TTL:
            return {'id': key, 'cached': True}
        data = await weather(config)
        try:
            result = await asyncio.to_thread(analyze, data['rows'], params)
        except ValueError as exc:
            raise HTTPException(422, str(exc)) from exc
        record = {**data, **result, 'id': key, 'backendId': key,
                  'createdAt': datetime.now(timezone.utc).isoformat(),
                  'storage': 'MongoDB' if _mongo is not None else 'TinyDB'}
        await asyncio.to_thread(put_doc, 'analyses', key, record)
        return {'id': key, 'cached': False, 'weatherCached': data['weatherCached']}


def valid_id(key):
    if len(key) != 64 or any(x not in '0123456789abcdef' for x in key):
        raise HTTPException(404, 'Analysis not found')


@app.get('/api/analyses')
async def list_analyses():
    def read():
        with _store_lock:
            docs = list(_mongo.analyses.find({}, {'_id': 0}).sort('created', -1).limit(30)) if _mongo is not None else sorted(_db.table('analyses').all(), key=lambda x: x['created'], reverse=True)[:30]
            return [{k: doc['data'][k] for k in ['id', 'config', 'source', 'createdAt', 'totalEvents']} for doc in docs]
    return await asyncio.to_thread(read)


@app.get('/api/analyses/{key}')
async def read_analysis(key: str):
    valid_id(key)
    doc = await asyncio.to_thread(get_doc, 'analyses', key)
    if not doc:
        raise HTTPException(404, 'Analysis not found')
    return doc['data']


@app.get('/api/analyses/{key}/export/{kind}')
async def export(key: str, kind: Literal['csv', 'pdf', 'json']):
    r = await read_analysis(key)
    if kind == 'json':
        return Response(json.dumps(r, allow_nan=False), media_type='application/json', headers={'Content-Disposition': 'attachment; filename=aether-analysis.json'})
    if kind == 'csv':
        out = io.StringIO(); w = csv.writer(out)
        w.writerow(['year', 'events', 'days', 'longest_run_days', 'coverage', 'included', 'hazard', 'threshold'])
        for row in r['annual']:
            w.writerow([row['year'], row['events'], row['days'], row['maxDuration'], row['coverage'], row['valid'], r['config']['hazard'], r['threshold']])
        return Response(out.getvalue(), media_type='text/csv', headers={'Content-Disposition': 'attachment; filename=aether-annual.csv'})
    def report():
        from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
        from reportlab.lib.styles import getSampleStyleSheet
        from reportlab.lib import colors
        from reportlab.pdfbase import pdfmetrics
        from reportlab.pdfbase.ttfonts import TTFont
        import reportlab
        font_path = Path(reportlab.__file__).parent / 'fonts' / 'Vera.ttf'
        pdfmetrics.registerFont(TTFont('AetherReport', str(font_path)))
        out = io.BytesIO(); styles = getSampleStyleSheet(); c = r['config']
        for style in styles.byName.values():
            style.fontName = 'AetherReport'
        story = [Paragraph('AETHER | Climate hazard report', styles['Title']),
                 Paragraph(escape(c['region']['name']) + f" | {c['start']}-{c['end']}", styles['Heading2']),
                 Paragraph(f"Hazard: {c['hazard']} | Source: Open-Meteo / ERA5 | Baseline: 1961-1990", styles['BodyText']),
                 Paragraph(f"Threshold: {r['threshold']:.3f} {'C' if c['hazard']=='heat' else 'mm/day'} | Events: {r['totalEvents']} | Hazard days: {r['totalDays']} | Coverage: {r['coverage']:.1%}", styles['BodyText']),
                 Spacer(1, 14), Paragraph('Annual frequency', styles['Heading2'])]
        from reportlab.graphics.shapes import Drawing
        from reportlab.graphics.charts.barcharts import VerticalBarChart
        drawing = Drawing(450, 160); bars = VerticalBarChart(); bars.x=30;bars.y=25;bars.width=410;bars.height=125
        bars.valueAxis.valueMin = 0
        bars.data = [[x['events'] if x['valid'] else 0 for x in r['annual']]]
        bars.categoryAxis.categoryNames=[str(x['year']) if i%5==0 else '' for i,x in enumerate(r['annual'])]
        bars.categoryAxis.labels.fontSize=6;bars.bars[0].fillColor=colors.HexColor('#d97950');drawing.add(bars);story.append(drawing)
        story += [Spacer(1, 12), Paragraph('Descriptive trend only; no statistical significance or causal attribution is claimed. Years below 90% coverage are excluded from totals and fits (shown as zero in this compact chart). Missing days break runs. Event starts count by starting year; duration can cross years. Dry spells are a screening proxy, not a drought diagnosis.', styles['BodyText']), Spacer(1, 14)]
        table = Table([['Year', 'Events', 'Days', 'Longest', 'Coverage', 'Included']] + [[a['year'],a['events'],a['days'],a['maxDuration'],f"{a['coverage']:.1%}",str(a['valid'])] for a in r['annual']],repeatRows=1)
        table.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),colors.HexColor('#d9eea3')),('FONTNAME',(0,0),(-1,-1),'AetherReport'),('FONTSIZE',(0,0),(-1,-1),8),('BOTTOMPADDING',(0,0),(-1,-1),6),('LINEBELOW',(0,0),(-1,-1),.25,colors.lightgrey)]))
        story.append(table);SimpleDocTemplate(out).build(story);return out.getvalue()
    return Response(await asyncio.to_thread(report), media_type='application/pdf', headers={'Content-Disposition':'attachment; filename=aether-report.pdf'})


static = BASE / 'static'
if static.exists():
    app.mount('/assets', StaticFiles(directory=static / 'assets'), name='assets')
    @app.get('/')
    def index():
        return FileResponse(static / 'index.html')
