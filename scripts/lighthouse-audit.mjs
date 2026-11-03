import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';

const origin=process.env.LIGHTHOUSE_BASE_URL||'http://127.0.0.1:3000';
const minimum=90;
const targets=[
 {route:'/',mode:'mobile',name:'home-mobile'},
 {route:'/',mode:'desktop',name:'home-desktop'},
 {route:'/work',mode:'mobile',name:'work-mobile'},
 {route:'/work',mode:'desktop',name:'work-desktop'},
 {route:'/journal',mode:'mobile',name:'journal-mobile'},
 {route:'/journal',mode:'desktop',name:'journal-desktop'}
];
await mkdir('lighthouse-artifacts',{recursive:true});
const report=[];
let fail=false;
for(const check of targets){
 const path='lighthouse-artifacts/'+check.name+'.json';
 const args=[
  'lighthouse',origin+check.route,
  '--only-categories=performance',
  '--output=json',
  '--output-path='+path,
  '--chrome-flags=--headless --no-sandbox --disable-dev-shm-usage',
  '--max-wait-for-load=30000',
  '--quiet'
 ];
 if(check.mode==='desktop')args.push('--preset=desktop');
 const result=spawnSync('npx',args,{encoding:'utf8',env:process.env,timeout:160000,maxBuffer:10*1024*1024});
 if(result.status!==0){
  fail=true;
  console.error('LIGHTHOUSE_ERROR',check.name,result.status,(result.stderr||result.stdout).slice(-2200));
  continue;
 }
 let audit;
 try{audit=JSON.parse(await readFile(path,'utf8'))}
 catch(e){console.error('Missing Lighthouse result',check.name,String(e));fail=true;continue;}
 const score=Math.round((audit.categories?.performance?.score??0)*100);
 const audits=audit.audits||{};
 const metric=(id)=>audits[id]?.numericValue??null;
 const entry={page:check.name,score,performanceTarget:minimum,
  fcpMs:metric('first-contentful-paint'),lcpMs:metric('largest-contentful-paint'),
  tbtMs:metric('total-blocking-time'),cls:metric('cumulative-layout-shift'),
  speedIndexMs:metric('speed-index')};
 report.push(entry);
 console.log('LIGHTHOUSE',JSON.stringify(entry));
 if(score<minimum){fail=true;console.error('PERFORMANCE BELOW 90',check.name,score);}
}
await writeFile('lighthouse-artifacts/summary.json',JSON.stringify(report,null,2));
console.log('LIGHTHOUSE SUMMARY',report.map(r=>r.page+': '+r.score).join(' | '));
if(fail){console.error('PERFORMANCE GATE FAILED — every route/device must score >=90');process.exitCode=1}
else console.log('PERFORMANCE GATE PASSED — all routes >=90');
