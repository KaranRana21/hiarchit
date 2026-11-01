import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const BASE=process.env.SMOKE_BASE_URL||'http://127.0.0.1:3000';
const widths=[320,360,390,430,768,1024,1440,1920];
const out='smoke-artifacts';await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--disable-dev-shm-usage','--enable-unsafe-swiftshader']});
const fails=[];let checks=0;
async function inspect(width){
 const context=await browser.newContext({viewport:{width,height:width<700?820:900},deviceScaleFactor:1,reducedMotion:width===320?'reduce':'no-preference'});
 const page=await context.newPage();
 const exceptions=[];
 page.on('pageerror',e=>exceptions.push(e.message));
 async function check(label,fn){
  checks++;
  try{await fn();console.log('PASS '+width+'px '+label);}
  catch(e){fails.push(width+'px '+label+': '+e.message);console.error('FAIL '+width+'px '+label+': '+e.message);await page.screenshot({path:out+'/failure-'+width+'-'+label.replace(/[^a-z]+/gi,'-')+'.png'}).catch(()=>{});}
 }
 try{
  await page.goto(BASE,{waitUntil:'domcontentloaded',timeout:30000});
  await page.locator('h1').first().waitFor({state:'visible',timeout:12000});
  await page.waitForTimeout(500);
  await check('Archit identity',async()=>{
   assert.match(await page.title(),/Archit Jain/);
   assert.match(await page.locator('h1').innerText(),/ARCHIT/i);
   assert.ok(await page.locator('.l-home-hero img').count()>0);
   assert.equal(await page.locator('.l-work-list .l-feature-item').count(),5);
  });
  await check('monochrome reference design',async()=>{
   const c=await page.locator('body').evaluate(e=>getComputedStyle(e).backgroundColor);
   assert.equal(c,'rgb(255, 255, 255)');
   assert.equal(await page.locator('.l-manifesto').count(),1);
   assert.equal(await page.locator('.l-extras-items > a').count(),7);
  });
  await check('no horizontal overflow',async()=>{
   const dims=await page.evaluate(()=>({view:innerWidth,doc:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
   assert.ok(Math.max(dims.doc,dims.body)<=dims.view+2,JSON.stringify(dims));
  });
  await check('required links',async()=>{
   assert.ok(await page.locator('a[href="/work"]').count()>0);
   assert.ok(await page.locator('a[href="/journal"]').count()>0);
   assert.ok(await page.locator('a[href*="drive.google.com"]').count()>0);
   assert.ok(await page.locator('a[href^="mailto:architjain808@gmail.com"]').count()>0);
  });
  await check('portrait loads',async()=>{
   await page.locator('.l-about-image img').scrollIntoViewIfNeeded();
   await page.waitForFunction(()=>{const im=document.querySelector('.l-about-image img');return im?.complete;},null,{timeout:15000});
   assert.ok(await page.locator('.l-about-image img').evaluate(e=>e.naturalWidth>0));
  });
  if(width<=768){
   await check('menu opens and closes',async()=>{
    const menu=page.locator('button.l-menu-button');
    await menu.click();
    assert.equal(await menu.getAttribute('aria-expanded'),'true');
    assert.equal(await page.locator('.l-menu-visible').count(),1);
    await page.locator('.l-menu-visible a[href="/work"]').click();
    await page.waitForURL('**/work');
    assert.equal(await menu.getAttribute('aria-expanded'),'false');
    assert.equal(await page.locator('h1').innerText().then(x=>x.includes('Selected')),true);
   });
  }
  if(width===1440){
   await check('work route lists authentic projects',async()=>{
    await page.goto(BASE+'/work');
    assert.equal(await page.locator('article.l-case').count(),4);
    assert.match(await page.locator('body').innerText(),/UMANG Web/);
   });
   await check('journal route contains real articles',async()=>{
    await page.goto(BASE+'/journal');
    assert.equal(await page.locator('a.l-article-row').count(),6);
   });
   await check('404 route',async()=>{const r=await page.goto(BASE+'/missing-smoke-page');assert.equal(r?.status(),404);});
  }
  await check('runtime exceptions',async()=>assert.deepEqual(exceptions,[]));
  if([390,1440].includes(width)){
   await page.goto(BASE,{waitUntil:'domcontentloaded'});
   await page.waitForTimeout(1000);
   await page.evaluate(async()=>{
    for(let y=0;y<document.body.scrollHeight;y+=Math.floor(innerHeight*.82)){scrollTo(0,y);await new Promise(r=>setTimeout(r,65))}
    scrollTo(0,0);
   });
   await page.waitForTimeout(600);
   await page.screenshot({path:out+'/locomotive-archit-'+width+'.png',fullPage:true});
  }
 }finally{await context.close()}
}
try{for(const w of widths)await inspect(w);console.log('SMOKE RESULT: '+(checks-fails.length)+'/'+checks+' passed');if(fails.length){console.error('FAILURES:\n'+fails.join('\n'));process.exitCode=1;}}
finally{await browser.close()}
