'use client';

import {useCallback,useEffect,useRef,useState} from 'react';

/**
 * APERTURE / AJ — deliberate first-visit visual ceremony, not download progress.
 * One short sequence per session; skips on reduced motion, Save-Data and repeat visits.
 * Hero remains rendered underneath. No body scroll locks or JS-dependent blank screen.
 * Sequence: 1.43s instrument settle + 860ms coordinated split-panel handoff.
 */
const KEY='archit-aperture-intro-v2';
const INTRO_MS=1430;
const EXIT_MS=860;

export function SiteLoader(){
 const [phase,setPhase]=useState<'enter'|'exit'|'done'>('enter');
 const closed=useRef(false);
 const exitTimer=useRef<ReturnType<typeof setTimeout>|null>(null);

 const finish=useCallback((immediate=false)=>{
  if(closed.current)return;
  closed.current=true;
  try{sessionStorage.setItem(KEY,'1')}catch{}
  if(immediate){setPhase('done');return}
  setPhase('exit');
  exitTimer.current=setTimeout(()=>setPhase('done'),EXIT_MS);
 },[]);

 useEffect(()=>{
  let seen=false;
  try{seen=sessionStorage.getItem(KEY)==='1'}catch{}
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData=!!(navigator as Navigator&{connection?:{saveData?:boolean}}).connection?.saveData;
  if(seen||reduced||saveData){
   const next=window.setTimeout(()=>finish(true),0);
   return()=>window.clearTimeout(next);
  }
  const intro=window.setTimeout(()=>finish(),INTRO_MS);
  // Failsafe independent of decorative CSS.
  const hardStop=window.setTimeout(()=>{if(!closed.current)finish(true)},3800);
  return()=>{window.clearTimeout(intro);window.clearTimeout(hardStop)};
 },[finish]);

 useEffect(()=>()=>{if(exitTimer.current)clearTimeout(exitTimer.current)},[]);

 if(phase==='done')return null;

 return <div className={'aperture-loader'+(phase==='exit'?' aperture-loader--out':'')}
  data-testid="site-loader" data-phase={phase} role="status"
  aria-label="Introducing Archit Jain portfolio" aria-live="off">
  <div className="aperture-loader__panel aperture-loader__panel--left" aria-hidden="true"/>
  <div className="aperture-loader__panel aperture-loader__panel--right" aria-hidden="true"/>
  <div className="aperture-loader__grid" aria-hidden="true"/>
  <header className="aperture-loader__top" aria-hidden="true">
   <span className="aperture-loader__brand"><span className="aperture-loader__brand-mark">AJ</span><span className="aperture-loader__brand-rule"/> ARCHIT JAIN</span>
   <span className="aperture-loader__top-note">A PERSONAL SPACE<br/>FOR IDEAS & INTERFACES</span>
  </header>
  <main className="aperture-loader__composition" aria-hidden="true">
   <div className="aperture-loader__left-caption"><span>01 — 01</span><span>DESIGN<br/>THROUGH<br/>ENGINEERING.</span></div>
   <div className="aperture-loader__machine">
    <div className="aperture-loader__guide aperture-loader__guide--horizontal"/>
    <div className="aperture-loader__guide aperture-loader__guide--vertical"/>
    <span className="aperture-loader__tick aperture-loader__tick--north">Nº 001</span>
    <span className="aperture-loader__tick aperture-loader__tick--east">FORM / FUNCTION</span>
    <div className="aperture-loader__ring aperture-loader__ring--outer"/>
    <div className="aperture-loader__ring aperture-loader__ring--oblique"/>
    <div className="aperture-loader__ring aperture-loader__ring--fine"/>
    <div className="aperture-loader__core">
     <span className="aperture-loader__core-light"/>
     <span className="aperture-loader__core-glyph">A<span>J</span><i>.</i></span>
    </div>
    <span className="aperture-loader__locator aperture-loader__locator--a"/>
    <span className="aperture-loader__locator aperture-loader__locator--b"/>
   </div>
   <div className="aperture-loader__right-caption"><span>002 / 026</span><span>BUILDING<br/>WHAT&apos;S<br/>NEXT.</span></div>
  </main>
  <footer className="aperture-loader__foot">
   <div className="aperture-loader__foot-title"><strong>BEYOND THE INTERFACE</strong><span>BY ARCHIT JAIN</span></div>
   <div className="aperture-loader__timeline" aria-hidden="true"><span/></div>
   <button className="aperture-loader__skip" type="button" onClick={()=>finish(true)}>SKIP INTRO <span aria-hidden="true">↗</span></button>
  </footer>
 </div>;
}
