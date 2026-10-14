"""Transparent detector matching the single-file browser engine; no imputation."""
from datetime import date, timedelta
from math import floor, ceil, isfinite


def numeric(x):
    return isinstance(x, (int, float)) and not isinstance(x, bool) and isfinite(x)


def quantile(values, p):
    a = sorted(v for v in values if numeric(v))
    if not a:
        return None
    i = (len(a) - 1) * p
    return a[floor(i)] + (a[ceil(i)] - a[floor(i)]) * (i - floor(i))


def regression(rows, key='events'):
    a = [r for r in rows if r['valid'] and numeric(r[key])]
    if len(a) < 3:
        return {'slope': None, 'r2': None, 'n': len(a)}
    mx = sum(r['year'] for r in a) / len(a)
    my = sum(r[key] for r in a) / len(a)
    xy = sum((r['year']-mx)*(r[key]-my) for r in a)
    xx = sum((r['year']-mx)**2 for r in a)
    yy = sum((r[key]-my)**2 for r in a)
    slope = xy/xx
    return {'slope': slope, 'intercept': my-slope*mx, 'r2': xy*xy/(xx*yy) if yy else 0, 'n': len(a)}


def analyze(source, config):
    keyed, duplicates, invalid = {}, 0, 0
    for r in source:
        try:
            d = date.fromisoformat(r['date'])
            if d.isoformat() != r['date']:
                raise ValueError('non-ISO date')
        except (ValueError, TypeError, KeyError):
            invalid += 1
            continue
        if r['date'] in keyed:
            duplicates += 1
        t, p = r.get('t'), r.get('p')
        keyed[r['date']] = {'date': r['date'],
                            't': t if numeric(t) and -90 <= t <= 65 else None,
                            'p': p if numeric(p) and 0 <= p <= 3000 else None}
    rows, d = [], date(min(1961, config['start']), 1, 1)
    while d <= date(max(1990, config['end']), 12, 31):
        iso = d.isoformat()
        rows.append(keyed.get(iso, {'date': iso, 't': None, 'p': None}))
        d += timedelta(days=1)
    key = 't' if config['hazard'] == 'heat' else 'p'
    baseline = [r for r in rows if '1961-01-01' <= r['date'] < '1991-01-01']
    base = [r[key] for r in baseline if numeric(r[key])]
    if len(base)/len(baseline) < .9:
        raise ValueError('Baseline coverage is below 90%. Supply 1961–1990 daily data.')
    wet = [x for x in base if x >= 1]
    if config['hazard'] == 'rain' and len(wet) < 30:
        raise ValueError('Too few baseline wet days to estimate a rainfall percentile.')
    threshold = 1 if config['hazard'] == 'dry' else quantile(wet if config['hazard'] == 'rain' else base, .95)
    minimum = {'heat': 3, 'rain': 1, 'dry': 14}[config['hazard']]
    annual = [{'year': y, 'events': 0, 'days': 0, 'maxDuration': 0, 'peak': None,
               'observed': 0, 'total': (date(y+1,1,1)-date(y,1,1)).days, 'months': [0]*12}
              for y in range(config['start'], config['end']+1)]
    by_year = {r['year']: r for r in annual}
    events, run = [], []

    def flush():
        if len(run) < minimum:
            return
        selected = [r for r in run if int(r['date'][:4]) in by_year]
        if not selected:
            return
        ev = {'start': run[0]['date'], 'end': run[-1]['date'], 'duration': len(run),
              'peak': len(run) if config['hazard'] == 'dry' else max(r[key] for r in run),
              'truncated': run[-1]['date'] == f"{config['end']}-12-31"}
        events.append(ev)
        start_year = int(ev['start'][:4])
        if start_year in by_year:
            by_year[start_year]['events'] += 1
        for r in selected:
            a = by_year[int(r['date'][:4])]
            a['days'] += 1
            a['months'][int(r['date'][5:7])-1] += 1
            a['maxDuration'] = max(a['maxDuration'], len(run))
            a['peak'] = max(a['peak'] if a['peak'] is not None else float('-inf'), ev['peak'])

    for r in rows:
        if r['date'] > f"{config['end']}-12-31":
            break
        a, value = by_year.get(int(r['date'][:4])), r[key]
        if a is not None and numeric(value):
            a['observed'] += 1
        hit = numeric(value) and (value < threshold if config['hazard'] == 'dry' else value > threshold)
        if hit:
            run.append(r)
        else:
            flush()
            run = []
    flush()
    for a in annual:
        a['coverage'] = a['observed']/a['total']
        a['valid'] = a['coverage'] >= .9
    good = [a for a in annual if a['valid']]
    window = 5
    first, last = annual[:window], annual[-window:]
    valid = len(annual) >= 10 and all(a['valid'] for a in first+last)
    f = sum(a['events'] for a in first)/len(first) if valid else None
    last_mean = sum(a['events'] for a in last)/len(last) if valid else None
    change = (last_mean-f)/f*100 if f is not None and f > 0 else None
    return {'config': config, 'threshold': threshold, 'annual': annual,
            'events': list(reversed(events)), 'trend': regression(annual),
            'durationTrend': regression(annual, 'maxDuration'), 'change': change,
            'comparison': {'window': window, 'first': f, 'last': last_mean, 'valid': valid},
            'totalEvents': sum(a['events'] for a in good), 'totalDays': sum(a['days'] for a in good),
            'maxDuration': max((a['maxDuration'] for a in good), default=0),
            'coverage': sum(a['observed'] for a in annual)/sum(a['total'] for a in annual),
            'baselineCoverage': len(base)/len(baseline), 'duplicates': duplicates, 'invalid': invalid,
            'excludedYears': [a['year'] for a in annual if not a['valid']]}
