import fs from 'node:fs';
const threshold=90;
let failed=false;
for(const kind of ['mobile','desktop']){
 const file='smoke-artifacts/lighthouse-'+kind+'.json';
 const report=JSON.parse(fs.readFileSync(file,'utf8'));
 const score=Math.round((report.categories?.performance?.score??0)*100);
 const metrics=report.audits||{};
 const pick=name=>metrics[name]?.displayValue??'n/a';
 const result={mode:kind,score,LCP:pick('largest-contentful-paint'),FCP:pick('first-contentful-paint'),TBT:pick('total-blocking-time'),CLS:pick('cumulative-layout-shift'),SpeedIndex:pick('speed-index')};
 console.log('LIGHTHOUSE '+JSON.stringify(result));
 if(score<threshold){failed=true;console.error('FAIL '+kind+': score '+score+' under hard '+threshold+' floor');}
}
if(failed)process.exitCode=1;
