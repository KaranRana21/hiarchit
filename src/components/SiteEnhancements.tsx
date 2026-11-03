'use client';
import {usePathname} from 'next/navigation';
import {useEffect,useRef,useState} from 'react';

/**
 * Site-wide, compositor-first interaction layer.
 * Single passive scroll subscriber, bounded RAF cursor, native WAAPI reveals.
 * Existing Three.js sculpture stays independent and FPS capped.
 */
export function SiteEnhancements(){
 const pathname=usePathname();
 const [showTop,setShowTop]=useState(false);
 const topRef=useRef<HTMLButtonElement>(null);
 const dotRef=useRef<HTMLSpanElement>(null);
 const haloRef=useRef<HTMLSpanElement>(null);
 const cueRef=useRef<HTMLSpanElement>(null);
 const reducedRef=useRef(false);

 useEffect(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData=!!(navigator as Navigator&{connection?:{saveData?:boolean}}).connection?.saveData;
  reducedRef.current=reduced||saveData;
  let lastVisible=false;
  let scrollFrame=0;
  const updateScroll=()=>{
   if(scrollFrame)return;
   scrollFrame=requestAnimationFrame(()=>{
    scrollFrame=0;
    const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);
    const pct=Math.min(100,Math.max(0,scrollY/max*100));
    topRef.current?.style.setProperty('--top-progress',pct.toFixed(2));
    const current=scrollY>Math.max(510,innerHeight*.8);
    if(current!==lastVisible){lastVisible=current;setShowTop(current);}
   });
  };
  window.addEventListener('scroll',updateScroll,{passive:true});
  window.addEventListener('resize',updateScroll,{passive:true});
  updateScroll();

  // A single observer orchestrates site chapters. No client render on scroll.
  const animations:Animation[]=[];
  let observer:IntersectionObserver|undefined;
  if(!reduced&&!saveData&&'IntersectionObserver' in window){
   const selectors=[
    '.statement-frame > p','.statement-sub','.rail-stat',
    '.exhibition-title-row > h2','.exhibition-title-row > p','.exhibition-shell',
    '.portrait-copy > h2','.portrait-copy > p','.portrait-frame',
    '.discipline-header > h2','.discipline-header > p','.discipline-line',
    '.trajectory-intro > h2','.experience-card','.education-card',
    '.journal-feature-head > h2','.journal-entry','.closing-preface',
    '.closing-cta','.closing-details',
    '.inner-hero h1','.inner-hero-foot','.case-art','.case-copy',
    '.article-row','.work-foot h2','[data-motion]',
    '.closing-top','.portrait-actions','.discipline-header','.trajectory-layout',
    '.exhibition-end','.section-heading-row','.case-data','.tags'
   ];
   const elements=Array.from(document.querySelectorAll<HTMLElement>(selectors.join(',')));
   observer=new IntersectionObserver(entries=>{
    for(const entry of entries){
     if(!entry.isIntersecting)continue;
     const el=entry.target as HTMLElement;
     observer?.unobserve(el);
     if(el.getBoundingClientRect().top<innerHeight*.16)continue;
     const siblings=Array.from(el.parentElement?.children||[]);
     const index=Math.max(0,siblings.indexOf(el));
     const delay=Math.min(260,(index%5)*70);
     const isHeading=/^H[1-6]$/.test(el.tagName);
     const threeD=el.matches('.portrait-frame,.exhibition-shell,.case-art,.experience-graphic');
     const translate=isHeading?46:threeD?26:25;
     // Never start hidden: SSR content readable before hydration and on failed JS.
     // Staggered WAAPI compositor animation: no React rerenders or GSAP bundle on mobile.
     const a=el.animate([
      {opacity:.54,transform:`translate3d(0,${translate}px,0) rotateX(${threeD?5:isHeading?3:0}deg) scale(${threeD?.965:1})`},
      {opacity:1,transform:'translate3d(0,0,0) rotateX(0deg) scale(1)'}
     ],{duration:threeD?1080:isHeading?980:820,delay,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'});
     a.onfinish=()=>a.cancel();
     animations.push(a);
    }
   },{threshold:.08,rootMargin:'0px 0px -8% 0px'});
   elements.forEach(el=>observer?.observe(el));
  }

  // Interactive 3D tilt: CSS variables only; never set React state per pointermove.
  const fine=window.matchMedia('(hover:hover) and (pointer:fine) and (min-width:901px)').matches;
  const tiltCleanup:Array<()=>void>=[];
  if(fine&&!reduced&&!saveData){
   document.querySelectorAll<HTMLElement>('[data-fx-tilt]').forEach(el=>{
    let rect:DOMRect|null=null,frame=0,px=0,py=0;
    const enter=()=>{rect=el.getBoundingClientRect();el.classList.add('fx-tilting');};
    const move=(e:PointerEvent)=>{
     if(!rect)rect=el.getBoundingClientRect();
     px=(e.clientX-rect.left)/rect.width-.5;
     py=(e.clientY-rect.top)/rect.height-.5;
     if(frame)return;
     frame=requestAnimationFrame(()=>{
      frame=0;el.style.setProperty('--fx-ry',`${(px*9).toFixed(2)}deg`);
      el.style.setProperty('--fx-rx',`${(-py*7).toFixed(2)}deg`);
      el.style.setProperty('--fx-px',`${(px*12).toFixed(2)}px`);
      el.style.setProperty('--fx-py',`${(py*12).toFixed(2)}px`);
     });
    };
    const leave=()=>{
     if(frame)cancelAnimationFrame(frame);frame=0;rect=null;
     el.style.setProperty('--fx-ry','0deg');el.style.setProperty('--fx-rx','0deg');
     el.style.setProperty('--fx-px','0px');el.style.setProperty('--fx-py','0px');
     el.classList.remove('fx-tilting');
    };
    el.addEventListener('pointerenter',enter);el.addEventListener('pointermove',move,{passive:true});el.addEventListener('pointerleave',leave);
    tiltCleanup.push(()=>{el.removeEventListener('pointerenter',enter);el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',leave);leave();});
   });
  }

  // Magnetic CTAs: RAF CSS transforms only, never layout properties.
  const magneticCleanup:Array<()=>void>=[];
  if(fine&&!reduced&&!saveData){
   document.querySelectorAll<HTMLElement>('.gravity-primary-action,.header-cta,.outline-link,.black-pill,.dark-pill,.closing-arrow').forEach(el=>{
    let rect:DOMRect|null=null,frame=0,dx=0,dy=0;
    const enter=()=>{rect=el.getBoundingClientRect();el.classList.add('fx-magnetic-active')};
    const move=(e:PointerEvent)=>{
     if(!rect)rect=el.getBoundingClientRect();
     dx=(e.clientX-(rect.left+rect.width/2))/rect.width;
     dy=(e.clientY-(rect.top+rect.height/2))/rect.height;
     if(frame)return;
     frame=requestAnimationFrame(()=>{frame=0;el.style.setProperty('--fx-mx',`${(dx*9).toFixed(2)}px`);el.style.setProperty('--fx-my',`${(dy*7).toFixed(2)}px`)});
    };
    const leave=()=>{if(frame)cancelAnimationFrame(frame);frame=0;rect=null;el.style.removeProperty('--fx-mx');el.style.removeProperty('--fx-my');el.classList.remove('fx-magnetic-active')};
    el.addEventListener('pointerenter',enter);el.addEventListener('pointermove',move,{passive:true});el.addEventListener('pointerleave',leave);
    magneticCleanup.push(()=>{el.removeEventListener('pointerenter',enter);el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',leave);leave()});
   });
  }

  // Exhibition art holds still outside viewport. Only active, visible chapter gets idle motion.
  const artTargets=document.querySelectorAll<HTMLElement>('.exhibition,.trajectory,.portrait-section');
  const artObserver=('IntersectionObserver' in window)?new IntersectionObserver(entries=>{
   for(const entry of entries)entry.target.classList.toggle('fx-chapter-live',entry.isIntersecting);
  },{threshold:.06}):null;
  artTargets.forEach(el=>artObserver?.observe(el));

  // Minimal cursor follower, active only for desktop fine-pointer users.
  let cursorFrame=0;
  let teardownCursor=()=>{};
  if(fine&&!reduced&&!saveData&&dotRef.current&&haloRef.current){
   const html=document.documentElement;
   const dot=dotRef.current,halo=haloRef.current,cue=cueRef.current;
   let tx=innerWidth/2,ty=innerHeight/2,hx=tx,hy=ty,seen=false;
   const render=()=>{
    cursorFrame=0;
    hx+=(tx-hx)*.21;hy+=(ty-hy)*.21;
    dot.style.transform=`translate3d(${tx}px,${ty}px,0) translate(-50%,-50%)`;
    halo.style.transform=`translate3d(${hx}px,${hy}px,0) translate(-50%,-50%)`;
    if(Math.abs(tx-hx)+Math.abs(ty-hy)>.35)cursorFrame=requestAnimationFrame(render);
   };
   const move=(e:PointerEvent)=>{
    if(e.pointerType==='touch')return;
    tx=e.clientX;ty=e.clientY;
    if(!seen){hx=tx;hy=ty;seen=true;}
    html.classList.add('fx-cursor-on');
    const target=e.target instanceof Element?e.target.closest('a,button,[data-cursor],input,textarea,select'):null;
    const custom=target?.getAttribute('data-cursor');
    const input=!!target?.matches('input,textarea,select');
    const text=custom==='drag'?'DRAG':custom==='view'?'VIEW':'';
    if(cue)cue.textContent=text;
    html.classList.toggle('fx-cursor-hover',!!target&&!input);
    html.classList.toggle('fx-cursor-label',!!text);
    if(!cursorFrame)cursorFrame=requestAnimationFrame(render);
   };
   const away=(e:PointerEvent)=>{if(!e.relatedTarget)html.classList.remove('fx-cursor-on');};
   const focus=()=>html.classList.remove('fx-cursor-on');
   window.addEventListener('pointermove',move,{passive:true});
   window.addEventListener('pointerout',away);
   window.addEventListener('blur',focus);
   teardownCursor=()=>{
    window.removeEventListener('pointermove',move);window.removeEventListener('pointerout',away);
    window.removeEventListener('blur',focus);
    if(cursorFrame)cancelAnimationFrame(cursorFrame);
    html.classList.remove('fx-cursor-on','fx-cursor-hover','fx-cursor-label');
   };
  }

  return()=>{
   window.removeEventListener('scroll',updateScroll);
   window.removeEventListener('resize',updateScroll);
   if(scrollFrame)cancelAnimationFrame(scrollFrame);
   observer?.disconnect();animations.forEach(a=>a.cancel());
   tiltCleanup.forEach(fn=>fn());magneticCleanup.forEach(fn=>fn());artObserver?.disconnect();
   artTargets.forEach(el=>el.classList.remove('fx-chapter-live'));teardownCursor();
  };
 },[pathname]);

 const toTop=()=>window.scrollTo({top:0,behavior:reducedRef.current?'instant':'smooth'});
 return <>
  <div className="fx-cursor" aria-hidden="true"><span ref={haloRef} className="fx-cursor-halo"><span ref={cueRef}/></span><span ref={dotRef} className="fx-cursor-dot"/></div>
  <button ref={topRef} type="button" className={'fx-backtop'+(showTop?' fx-backtop-visible':'')} onClick={toTop}
   aria-label="Back to top" title="Back to top" tabIndex={showTop?0:-1} aria-hidden={!showTop}>
   <svg aria-hidden="true" viewBox="0 0 56 56" width="56" height="56">
    <circle className="fx-backtop-track" cx="28" cy="28" r="22"/>
    <circle className="fx-backtop-progress" cx="28" cy="28" r="22" pathLength="100"/>
   </svg>
   <span aria-hidden="true">↑</span>
  </button>
 </>;
}
