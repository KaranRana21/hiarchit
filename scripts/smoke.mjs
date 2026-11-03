import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const origin = process.env.SMOKE_BASE_URL || 'http://127.0.0.1:3000';
const widths = [320,360,390,430,768,1024,1440,1920];
const dir = 'smoke-artifacts';
await fs.mkdir(dir,{recursive:true});
const browser = await chromium.launch({headless:true,args:['--disable-dev-shm-usage','--enable-unsafe-swiftshader']});
let checks=0;const failures=[];
async function run(width){
 const mobile=width<=768;
 const context=await browser.newContext({viewport:{width,height:mobile?820:900},deviceScaleFactor:1,
   reducedMotion:width===360?'reduce':'no-preference'});
 const page=await context.newPage();const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 const test=async(label,fn)=>{checks++;try{await fn();console.log('PASS '+width+'px '+label)}
   catch(e){failures.push(width+'px '+label+': '+e.message);console.log('FAIL '+width+'px '+label+': '+e.message);
   await page.screenshot({path:dir+'/failure-'+width+'-'+label.replace(/[^a-z]/gi,'-')+'.png'}).catch(()=>{});}};
 try{
  await page.goto(origin,{waitUntil:'domcontentloaded',timeout:30000});
  await page.locator('h1').waitFor({state:'visible',timeout:20000});
  await test('premium intro loader',async()=>{
   const intro=page.locator('[data-testid="site-loader"]');
   if(width===1440 && await intro.count()){
    assert.equal(await intro.locator('.aperture-loader__ring').count(),3);
    assert.equal(await intro.locator('.aperture-loader__panel').count(),2);
    assert.match(await intro.locator('.aperture-loader__core-glyph').innerText(),/AJ/);
    assert.equal(await intro.locator('button.aperture-loader__skip').count(),1);
   }
   if([390,1440].includes(width) && await intro.isVisible()){
    await page.screenshot({path:dir+'/aperture-intro-'+width+'.png'});
   }
   // WebGL startup can starve timers on headless software rendering.
   // Verify eventual dismiss, not strict millisecond timing.
   await intro.waitFor({state:'detached',timeout:20000});
   assert.notEqual(await page.locator('body').evaluate(e=>getComputedStyle(e).overflow),'hidden');
  });
  if(width===390){
   await test('skip intro works',async()=>{
    await page.evaluate(()=>sessionStorage.removeItem('archit-aperture-intro-v2'));
    await page.reload({waitUntil:'domcontentloaded'});
    const intro=page.locator('[data-testid="site-loader"]');
    await intro.waitFor({state:'visible',timeout:5000});
    await page.waitForTimeout(160);
    await intro.locator('button.aperture-loader__skip').dispatchEvent('click');
    await intro.waitFor({state:'detached',timeout:5000});
   });
  }
  await test('Archit identity',async()=>{
   assert.equal(await page.locator('h1').count(),1);
   assert.match(await page.title(),/Archit Jain/);
   assert.match(await page.locator('h1').innerText(),/ARCHIT\s*JAIN/);
   assert.ok(await page.locator('img[alt*="Archit Jain"]').count()>=1);
  });
  await test('Gravity Chamber hero',async()=>{
   assert.equal(await page.locator('section.gravity-hero').count(),1);
   assert.equal(await page.locator('.gravity-hero-title').count(),1);
   assert.match(await page.locator('.gravity-hero-name').innerText(),/ARCHIT JAIN/);
   assert.ok(await page.locator('.gravity-still-core').count()===1);
  });
  await test('hero display type not clipped',async()=>{
   if(width>520)return;
   await page.evaluate(()=>document.fonts.ready);
   const geometry=await page.locator('.gravity-headline-line').evaluateAll(els=>els.map(el=>({
     text:el.textContent?.trim(),available:el.clientWidth,needed:el.scrollWidth
   })));
   for(const g of geometry)assert.ok(g.needed<=g.available+3,JSON.stringify(g));
  });
  await test('readable sitewide microcopy',async()=>{
   const typography=await page.locator('.section-heading-row .micro-label').first().evaluate(el=>{
    const c=getComputedStyle(el);return {size:parseFloat(c.fontSize),weight:parseInt(c.fontWeight,10),font:c.fontFamily};
   });
   assert.ok(typography.size>=10 && typography.weight>=600,JSON.stringify(typography));
  });
  await test('no horizontal overflow',async()=>{
   const d=await page.evaluate(()=>({document:document.documentElement.scrollWidth,body:document.body.scrollWidth,view:innerWidth}));
   assert.ok(Math.max(d.document,d.body)<=d.view+2,JSON.stringify(d));
  });
  await test('links intact',async()=>{
   assert.ok(await page.locator('a[href="/work"]').count()>0);
   assert.ok(await page.locator('a[href="/journal"]').count()>0);
   assert.ok(await page.locator('a[href*="drive.google.com"]').count()>0);
   assert.ok(await page.locator('a[href^="mailto:architjain808@gmail.com"]').count()>0);
  });
  await test('sculpture fallback available',async()=>{
   assert.equal(await page.locator('.artifact-fallback').count(),1);
   assert.ok((await page.locator('.artifact-stage').boundingBox())?.width>80);
   if(width===320)assert.equal(await page.locator('.artifact-webgl.webgl-live').count(),0);
  });
  await test('working floating back-to-top',async()=>{
   await page.evaluate(()=>{
    document.documentElement.style.scrollBehavior='auto';
    window.scrollTo(0,document.documentElement.scrollHeight);
   });
   await page.waitForFunction(()=>document.querySelector('.fx-backtop-visible')!==null,null,{timeout:6000});
   const button=page.getByRole('button',{name:'Back to top'});
   await button.waitFor({state:'visible',timeout:6000});
   await button.click();
   await page.waitForFunction(()=>window.scrollY<55,null,{timeout:7000});
   assert.equal(await button.getAttribute('aria-label'),'Back to top');
  });
  if(width===1440){
   await test('desktop cursor and 3D hover',async()=>{
    const stage=page.locator('.stage-wrap[data-fx-tilt]');
    await stage.scrollIntoViewIfNeeded();
    await stage.hover({position:{x:150,y:130}});
    await page.waitForFunction(()=>document.documentElement.classList.contains('fx-cursor-label'),null,{timeout:4000});
    assert.equal((await page.locator('.fx-cursor-halo span').innerText()),'DRAG');
    const ry=await stage.evaluate(el=>el.style.getPropertyValue('--fx-ry'));
    assert.ok(ry.length>0,'tilt CSS variable not updated');
   });
  }
  await test('project index',async()=>{
   assert.equal(await page.locator('button.toc-item').count(),4);
   await page.locator('section.exhibition[data-hydrated="true"]').waitFor({state:'attached',timeout:12000});
   if(width===320){await page.locator('button.toc-item').nth(1).focus();await page.keyboard.press('Enter');}
   else await page.locator('button.toc-item').nth(1).click();
   await page.waitForFunction(() => document.querySelectorAll('button.toc-item')[1]?.getAttribute('aria-pressed') === 'true', null, {timeout:4000});
   assert.match(await page.locator('.project-spotlight h3').innerText(),/ITPO Booking/);
   await page.getByRole('button',{name:'Next project'}).click();
   assert.match(await page.locator('.project-spotlight h3').innerText(),/Anuvachan/);
  });
  if(mobile){
   await test('mobile navigation',async()=>{
    const menu=page.locator('button.menu-toggle');assert.ok(await menu.isVisible());
    await menu.click();assert.equal(await menu.getAttribute('aria-expanded'),'true');
    await page.locator('nav.header-nav a[href="/work"]').click();
    await page.waitForURL('**/work',{timeout:10000});
    assert.equal(await menu.getAttribute('aria-expanded'),'false');
   });
  }
  if(width===1440){
   await test('motion control',async()=>{
    const toggle=page.locator('button.gravity-motion-toggle');
    await toggle.click();
    assert.equal(await toggle.getAttribute('aria-pressed'),'true');
    await toggle.click();
    assert.equal(await toggle.getAttribute('aria-pressed'),'false');
   });
   await test('WebGL studio sculpture active',async()=>{
    await page.waitForTimeout(1900);
    const state=await page.evaluate(()=>{
      const gl=document.createElement('canvas').getContext('webgl2',{failIfMajorPerformanceCaveat:true});
      const debug=gl?.getExtension('WEBGL_debug_renderer_info');
      const renderer=debug?String(gl?.getParameter(debug.UNMASKED_RENDERER_WEBGL)||''):'';
      return {
       capable:!!gl&&!/swiftshader|llvmpipe|softpipe|software rasterizer/i.test(renderer),
       live:!!document.querySelector('.artifact-webgl.webgl-live'),
       renderer
      };
    });
    console.log('SCULPTURE STATE '+JSON.stringify(state));
    if(state.capable)assert.equal(state.live,true,'WebGL supported but scene not active');
   });
   await test('Archit portrait load',async()=>{
    await page.locator('img[alt*="Archit Jain"]').first().scrollIntoViewIfNeeded();
    await page.waitForFunction(()=>{const i=document.querySelector('img[alt*="Archit Jain"]');return i?.complete;},null,{timeout:8000});
    assert.ok(await page.locator('img[alt*="Archit Jain"]').first().evaluate(img=>img.naturalWidth>0));
   });
   await test('full work route',async()=>{
    await page.goto(origin+'/work');assert.equal(await page.locator('article.case').count(),4);
    assert.equal(await page.locator('.case-art[data-fx-tilt]').count(),4);
   });
   await test('journal articles',async()=>{
    await page.goto(origin+'/journal');assert.equal(await page.locator('a.article-row').count(),6);
   });
   await test('404 handling',async()=>{
    const response=await page.goto(origin+'/missing-qa-url');assert.equal(response.status(),404);
   });
  }
  if(width===1440){
   await test('intro stays dismissed after reload',async()=>{
    await page.goto(origin,{waitUntil:'domcontentloaded'});
    await page.locator('[data-testid="site-loader"]').waitFor({state:'detached',timeout:2500});
   });
  }
  await test('no runtime exception',async()=>assert.deepEqual(errors,[]));
  if([390,1440].includes(width)){
   await page.goto(origin,{waitUntil:'domcontentloaded'});
   await page.waitForTimeout(2300);
   await page.evaluate(async()=>{
    for(let y=0;y<document.body.scrollHeight;y+=680){
     window.scrollTo(0,y);await new Promise(resolve=>setTimeout(resolve,110));
    }
    scrollTo(0,0);
   });
   await page.waitForTimeout(900);
   await page.screenshot({path:dir+'/future-form-'+width+'.png',fullPage:true});
  }
 }finally{await context.close()}
}
try{for(const w of widths)await run(w);
console.log('SMOKE RESULT: '+(checks-failures.length)+'/'+checks+' passed');
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}
}finally{await browser.close()}