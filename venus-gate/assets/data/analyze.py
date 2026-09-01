import pandas as pd, numpy as np, json, glob, re

files = {
 'A': ('c95102b2-VenusGate_RunA_36cpr_n30.csv', 36),
 'B': ('93518547-VenusGate_RunB_72cpr_n30.csv', 72),
 'C': ('59a0356d-VenusGate_RunC_104cpr_n30.csv', 104),
}
out = {}
for k,(f,cpr) in files.items():
    df = pd.read_csv(f)
    df.columns = [re.sub(r'\s*/\s*\d+$','',c).strip() for c in df.columns]
    rows=[]
    for play, g in df.groupby('play'):
        g = g.sort_values('step')
        last = g['step'].max()
        end = g.loc[g['step']==last].iloc[0]
        # step at which circuits first >= 700
        c_hit = g.loc[g['Circuits']>=700,'step']
        c_step = int(c_hit.min()) if len(c_hit) else None
        rows.append(dict(play=int(play), steps=int(last),
                         circuits=int(end['Circuits']),
                         runs=int(end['Runs']),
                         sys=int(end['Systems']), neu=int(end['Neuroptics']),
                         circ_step=c_step))
    r = pd.DataFrame(rows)
    # censored = never reached 700 circuits OR ended at global max step with no completion
    maxstep = r['steps'].max()
    r['censored'] = r['circ_step'].isna()
    # binding: if circuits threshold crossed strictly before final step -> blueprints bound
    r['bp_bound'] = (~r['censored']) & (r['circ_step'] < r['steps'])
    out[k] = dict(cpr=cpr, n=len(r),
                  runs=r['runs'].tolist(),
                  mean=float(r['runs'].mean()), sd=float(r['runs'].std(ddof=1)),
                  cv=float(r['runs'].std(ddof=1)/r['runs'].mean()),
                  mn=int(r['runs'].min()), mx=int(r['runs'].max()),
                  median=float(r['runs'].median()),
                  bp_bound=int(r['bp_bound'].sum()),
                  censored=int(r['censored'].sum()),
                  maxstep=int(maxstep),
                  penalty=float(r.loc[r['bp_bound'],'runs'].mean()-r.loc[~r['bp_bound'],'runs'].mean()) if r['bp_bound'].sum()>0 else None,
                  circ_surplus=float((r['circuits']-700).mean()),
                  )
    print(k, out[k]['n'],'plays | mean',round(out[k]['mean'],2),'| sd',round(out[k]['sd'],2),
          '| cv',round(out[k]['cv'],3),'| range',out[k]['mn'],'-',out[k]['mx'],
          '| bp_bound',out[k]['bp_bound'],'| censored',out[k]['censored'],'| maxstep',out[k]['maxstep'])
    if out[k]['penalty']: print('   penalty when bp binds: +%.2f runs'%out[k]['penalty'])
json.dump(out, open('summary.json','w'), indent=1)
