import json, math
p = {'N':0.3872,'C':0.3872,'S':0.2256}
def cdf_all3(n):
    # P(all three collected within n draws) via inclusion-exclusion
    if n<3: return 0.0
    v=1.0
    for k in p: v -= (1-p[k])**n
    for a,b in [('N','C'),('N','S'),('C','S')]:
        v += (1-p[a]-p[b])**n
    v -= 0.0  # (1-pN-pC-pS)^n = 0
    return v
# verify mean
mean = sum(1-cdf_all3(n) for n in range(0,400))
print('mean runs to all 3 BPs = %.4f'%mean)
for n in [7,10,20]:
    print('  n=%d  P(not done)=%.4f%%'%(n,(1-cdf_all3(n))*100))
curve=[]
for c in range(20,145):
    r = math.ceil(700/c)
    curve.append(dict(cpr=c, runs=r, p=(1-cdf_all3(r))*100))
# threshold: first cpr where p >= 5%
thr = next(x['cpr'] for x in curve if x['p']>=5)
print('first cpr with P>=5%%:',thr)
thr10 = next(x['cpr'] for x in curve if x['p']>=10)
print('first cpr with P>=10%%:',thr10)
# BP cdf for chart1
bp = [dict(n=n, pct=cdf_all3(n)*100) for n in range(0,25)]
json.dump(dict(curve=curve, bp_cdf=bp, mean_bp=mean), open('closed.json','w'))
