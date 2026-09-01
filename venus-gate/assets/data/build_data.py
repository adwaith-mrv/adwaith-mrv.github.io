import pandas as pd, numpy as np, json, re, math
files = {'A':('c95102b2-VenusGate_RunA_36cpr_n30.csv',36),
         'B':('93518547-VenusGate_RunB_72cpr_n30.csv',72),
         'C':('59a0356d-VenusGate_RunC_104cpr_n30.csv',104)}
D={}
for k,(f,cpr) in files.items():
    df=pd.read_csv(f); df.columns=[re.sub(r'\s*/\s*\d+$','',c).strip() for c in df.columns]
    rows=[]
    for pl,g in df.groupby('play'):
        g=g.sort_values('step'); last=int(g['step'].max()); e=g[g['step']==last].iloc[0]
        cs=int(g.loc[g['Circuits']>=700,'step'].min())
        rows.append(dict(play=int(pl),runs=int(e['Runs']),circ_step=cs,
                         bp=bool(cs<last),circuits=int(e['Circuits'])))
    r=pd.DataFrame(rows)
    runs=sorted(r['runs'].tolist())
    hist={}
    for v in runs: hist[v]=hist.get(v,0)+1
    b=r[r.bp]
    D[k]=dict(cpr=cpr,n=len(r),runs=runs,
        hist=[dict(x=int(x),n=int(c)) for x,c in sorted(hist.items())],
        mean=round(float(r.runs.mean()),2), median=float(r.runs.median()),
        sd=round(float(r.runs.std(ddof=1)),2),
        cv=round(float(r.runs.std(ddof=1)/r.runs.mean()),3),
        mn=int(r.runs.min()), mx=int(r.runs.max()),
        bound=int(r.bp.sum()),
        extra=sorted((b.runs-b.circ_step).tolist()) if len(b) else [],
        extra_mean=round(float((b.runs-b.circ_step).mean()),2) if len(b) else None,
        surplus=round(float((r.circuits-700).mean()),1),
        # empirical CDF of circuits threshold step
        circ_cdf=[dict(n=int(n), pct=round(float((r.circ_step<=n).mean()*100),2)) for n in range(0, int(r.runs.max())+2)])
closed=json.load(open('closed.json'))
out=dict(runs=D, closed=closed,
    meta=dict(model='The Venus Gate - first crafted Warframe', nodes=9,
      plays_per_config=30, step_cap={'A':40,'B':40,'C':25},
      max_steps_used={k:max(v['runs']) for k,v in D.items()},
      drop_table={'Neuroptics':38.72,'Chassis':38.72,'Systems':22.56},
      circuits_required=700, source='Machinations.io simulation output, 2026-08-25'))
json.dump(out, open('chartdata.json','w'), indent=1)
print(json.dumps({k:{kk:vv for kk,vv in v.items() if kk not in ('runs','hist','circ_cdf')} for k,v in D.items()}, indent=1))
print('max steps used:', out['meta']['max_steps_used'])
