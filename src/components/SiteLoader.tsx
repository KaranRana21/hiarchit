'use client';

import {useCallback,useEffect,useRef,useState} from 'react';

const KEY='archit-intro-seen-v1';
const DURATION=1650;
const EXIT=690;

/** One-time brand ceremony. Counter is intro timing, not claimed download progress. */
export function SiteLoader(){
 const [phase,setPhase]=useState<'loading'|'exiting'|'hidden'>('loading');
 const [progress,setProgress]=useState(0);
 const dismissed=useRef(false);
 const exitTimeout=useRef<ReturnType<typeof setTimeout>|null>(null);

 const finish=useCallback((instant=false)=>{
  if(dismissed.current)return;
  dismissed.current=true;
  try{sessionStorage.setItem(KEY,'1')}catch{}
  setProgress(100);
  if(instant){setPhase('hidden');return}
  setPhase('exiting');
  exitTimeout.current=setTimeout(()=>setPhase('hidden'),EXIT);
 },[]);

 useEffect(()=>{
  let seen=false;
  try{seen=sessionStorage.getItem(KEY)==='1'}catch{}
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData=(navigator as Navigator&{connection?:{saveData?:boolean}}).connection?.saveData;
  if(seen||reduced||saveData){finish(true);return}
  const oldOverflow=document.body.style.overflow;
  document.body.style.overflow='hidden';
  let raf=0,finished=false;
  const began=performance.now();
  const tick=(now:number)=>{
   const fraction=Math.min(1,(now-began)/DURATION);
   // Deliberately measured motion with slight deceleration at end.
   const eased=1-Math.pow(1-fraction,2.6);
   setProgress(Math.min(100,Math.floor(eased*100)));
   if(fraction>=1){finished=true;finish();return}
   raf=requestAnimationFrame(tick);
  };
  raf=requestAnimationFrame(tick);
  // Hard upper bound: no loader should trap audience after an animation hiccup.
  const deadline=setTimeout(()=>{if(!finished)finish()},3000);
  return()=>{
   cancelAnimationFrame(raf);
   clearTimeout(deadline);
   document.body.style.overflow=oldOverflow;
  };
 },[finish]);

 useEffect(()=>{
  if(phase!=='hidden')return;
  document.body.classList.remove('site-loading');
  document.body.style.removeProperty('overflow');
 },[phase]);

 useEffect(()=>()=>{if(exitTimeout.current)clearTimeout(exitTimeout.current)},[]);

 if(phase==='hidden')return null;

 return <div className={'intro-loader '+(phase==='exiting'?'intro-loader--exit':'')} data-testid="site-loader" data-phase={phase} role="status" aria-label="Introducing Archit Jain portfolio" aria-live="off">
  <div className="intro-loader__texture" aria-hidden="true"/>
  <div className="intro-loader__header" aria-hidden="true">
   <span>AJ<span className="intro-loader__registered">®</span> / PORTFOLIO</span>
   <span>EST. IN CURIOSITY <span className="intro-loader__cross">✳</span></span>
  </div>
  <div className="intro-loader__center" aria-hidden="true">
   <div className="intro-loader__eyebrow"><i/> THE HUMAN INTERFACE <span>01 — 01</span></div>
   <div className="intro-loader__hero">
    <span className="intro-loader__word intro-loader__word--one">ARCHIT<span className="intro-loader__mark">.</span></span>
    <span className="intro-loader__word intro-loader__word--two">JAIN</span>
   </div>
   <div className="intro-loader__subline">ENGINEERING <span>×</span> INSTINCT</div>
  </div>
  <div className="intro-loader__bottom">
   <div className="intro-loader__reading" aria-hidden="true"><span>CRAFTING FIRST IMPRESSION</span><span>INDIA / WORLDWIDE</span></div>
   <div className="intro-loader__progress" aria-hidden="true">
    <div className="intro-loader__progress-track"><div style={{transform:`scaleX(${progress/100})`}} className="intro-loader__progress-fill"/></div>
    <span className="intro-loader__value">{String(progress).padStart(3,'0')}<small>%</small></span>
   </div>
   <button type="button" className="intro-loader__skip" onClick={()=>finish(true)}>SKIP INTRO <span aria-hidden="true">↗</span></button>
  </div>
 </div>;
}
