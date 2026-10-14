from datetime import date, timedelta
import httpx
from fastapi.testclient import TestClient
from app.main import app

client=TestClient(app)
def provider():
    ds=[];ts=[];ps=[];d=date(1961,1,1)
    while d<=date(1993,12,31):
        ds.append(d.isoformat());ts.append(30 if date(1991,6,1)<=d<=date(1991,6,3) else 20);ps.append(0 if date(1992,1,1)<=d<=date(1992,1,14) else (10 if d==date(1993,6,1) else 2));d+=timedelta(days=1)
    return {'daily':{'time':ds,'temperature_2m_max':ts,'precipitation_sum':ps},'daily_units':{'temperature_2m_max':'°C','precipitation_sum':'mm'},'timezone':'GMT','latitude':28.5,'longitude':77.25}


def test_full_pipeline_all_hazards_cache_readback_exports(monkeypatch):
    calls=[]
    async def get(self,url,params):
        calls.append(url)
        return httpx.Response(200,json=provider(),request=httpx.Request('GET',url))
    monkeypatch.setattr(httpx.AsyncClient,'get',get)
    body={'region':{'name':'Test <region>','lat':28.6,'lon':77.2},'start':1991,'end':1993,'mode':'backend'}
    for hazard in ['heat','rain','dry']:
        response=client.post('/api/analyses',json=dict(body,hazard=hazard));assert response.status_code==200,response.text
        key=response.json()['id'];r=client.get('/api/analyses/'+key).json()
        assert r['totalEvents']==1 and r['config']['hazard']==hazard
        assert r['threshold']==(20 if hazard=='heat' else 2 if hazard=='rain' else 1)
        assert r['rows'] and r['source']=='Open-Meteo / ERA5'
        assert client.post('/api/analyses',json=dict(body,hazard=hazard)).json()['cached']
        assert client.get(f'/api/analyses/{key}/export/csv').text.startswith('year,events')
        assert client.get(f'/api/analyses/{key}/export/pdf').content.startswith(b'%PDF')
        assert client.get(f'/api/analyses/{key}/export/json').json()['id']==key
    assert len(calls)==1
    assert len(client.get('/api/analyses').json())==3


def test_indian_city_metadata_and_coordinates_reach_weather_api(monkeypatch):
    requested={}
    async def get(self,url,params):
        requested.update(params)
        return httpx.Response(200,json=provider(),request=httpx.Request('GET',url))
    monkeypatch.setattr(httpx.AsyncClient,'get',get)
    body={
        'region':{
            'name':'Surat, Gujarat, India',
            'country':'India',
            'state':'Gujarat',
            'city':'Surat',
            'lat':21.1702,
            'lon':72.8311,
        },
        'start':1991,
        'end':1993,
        'mode':'backend',
    }
    response=client.post('/api/analyses',json=body)
    assert response.status_code==200,response.text
    result=client.get('/api/analyses/'+response.json()['id']).json()
    assert result['config']['region']['state']=='Gujarat'
    assert result['config']['region']['country']=='India'
    assert result['config']['region']['city']=='Surat'
    assert requested['latitude']==21.1702
    assert requested['longitude']==72.8311


def test_bad_requests():
    for body in [{'region':{'lat':91,'lon':0}}, {'region':{'lat':0,'lon':0},'start':2025,'end':1990}, {'region':{'lat':0,'lon':0},'hazard':'tornado'}, {'region':{'lat':0,'lon':0},'end':date.today().year}]:
        assert client.post('/api/analyses',json=body).status_code==422
    assert client.get('/api/analyses/bad').status_code==404


def test_units_are_validated(monkeypatch):
    async def get(self,url,params):
        d=provider();d['daily_units']['temperature_2m_max']='°F'
        return httpx.Response(200,json=d,request=httpx.Request('GET',url))
    monkeypatch.setattr(httpx.AsyncClient,'get',get)
    r=client.post('/api/analyses',json={'region':{'lat':0,'lon':0}})
    assert r.status_code==502


def test_upstream_failure_is_explicit(monkeypatch):
    async def get(self,url,params):raise httpx.ConnectError('offline')
    monkeypatch.setattr(httpx.AsyncClient,'get',get)
    r=client.post('/api/analyses',json={'region':{'lat':0,'lon':0}})
    assert r.status_code==502 and 'No simulated' in r.json()['detail']


def test_rate_limit():
    for _ in range(8):assert client.post('/api/analyses',json={}).status_code==422
    assert client.post('/api/analyses',json={}).status_code==429
    assert client.get('/api/health').status_code==200
