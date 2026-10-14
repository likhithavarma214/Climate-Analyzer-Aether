from datetime import date, timedelta
from app.analysis import analyze
import pytest

def rows(start=1961,end=2005):
    d=date(start,1,1);out=[]
    while d<=date(end,12,31):
        out.append({'date':d.isoformat(),'t':20.,'p':2.});d+=timedelta(days=1)
    return out

def test_prebaseline_analysis_range():
    a=rows(1940,1990)
    for r in a:
        if '1945-01-01'<=r['date']<='1945-01-03':r['t']=30
    out=analyze(a,{'start':1940,'end':1950,'hazard':'heat'})
    assert out['threshold']==20 and out['totalEvents']==1 and out['coverage']==1

def test_zero_baseline_comparison_and_outliers():
    a=rows()
    for r in a:
        if '2005-06-01'<=r['date']<='2005-06-03':r['t']=30
    a.extend([{'date':'2005-02-30','t':30,'p':2},{'date':'2005-07-01','t':True,'p':float('nan')}])
    out=analyze(a,{'start':1991,'end':2005,'hazard':'heat'})
    assert out['change'] is None and out['comparison']['valid'] and out['comparison']['first']==0
    assert out['invalid']==1 and out['duplicates']==1 and out['annual'][-1]['observed']==364

def test_bad_baseline():
    with pytest.raises(ValueError):analyze([],{'start':1991,'end':2005,'hazard':'heat'})

def test_sparse_wet_days():
    a=rows()
    for r in a:r['p']=0
    with pytest.raises(ValueError):analyze(a,{'start':1991,'end':2005,'hazard':'rain'})
