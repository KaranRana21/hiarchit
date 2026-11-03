'use client';
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {projects} from '@/lib/content';
import {ProjectArt} from '@/components/ProjectArt';

export function SpatialWork(){
 const [current,setCurrent]=useState(0);
 const touchX=useRef<number|null>(null);
 const mouseX=useRef<number|null>(null);
 const readyRef=useRef<HTMLElement|null>(null);
 const tiltFrame=useRef(0);
 const tiltEnabled=useRef(false);
 const tiltTarget=useRef<HTMLDivElement|null>(null);
 const startTilt=(e:React.PointerEvent<HTMLDivElement>)=>{
  if(!tiltEnabled.current)return;
  tiltTarget.current=e.currentTarget;
  e.currentTarget.classList.add('fx-tilting');
 };
 const moveTilt=(e:React.PointerEvent<HTMLDivElement>)=>{
  if(!tiltEnabled.current)return;
  const el=e.currentTarget,rect=el.getBoundingClientRect();
  const px=(e.clientX-rect.left)/rect.width-.5;
  const py=(e.clientY-rect.top)/rect.height-.5;
  if(tiltFrame.current)return;
  tiltFrame.current=requestAnimationFrame(()=>{
   tiltFrame.current=0;
   el.style.setProperty('--fx-ry',(px*9).toFixed(2)+'deg');
   el.style.setProperty('--fx-rx',(-py*7).toFixed(2)+'deg');
  });
 };
 const stopTilt=()=>{
  if(tiltFrame.current)cancelAnimationFrame(tiltFrame.current);
  tiltFrame.current=0;
  const el=tiltTarget.current;
  if(el){el.style.removeProperty('--fx-ry');el.style.removeProperty('--fx-rx');el.classList.remove('fx-tilting');}
  tiltTarget.current=null;
 };
 useEffect(()=>{
  const el=readyRef.current;if(!el)return;
  el.setAttribute('data-hydrated','true');
  tiltEnabled.current=window.matchMedia('(hover:hover) and (pointer:fine) and (min-width:901px)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const observer=new IntersectionObserver(entries=>{
   el.classList.toggle('fx-chapter-live',entries[0]?.isIntersecting??false);
  },{threshold:.06});
  observer.observe(el);
  return()=>{observer.disconnect();if(tiltFrame.current)cancelAnimationFrame(tiltFrame.current)};
 },[]);
 const total=projects.length;
 const go=(direction:number)=>setCurrent(i=>(i+direction+total)%total);
 const pick=(i:number)=>setCurrent(i);
 const selected=projects[current];
 return <section ref={readyRef} className="exhibition" id="selected-work" aria-labelledby="selected-title">
  <div className="frame exhibition-frame">
   <div className="section-heading-row"><span className="micro-label">02 — THE BODY OF WORK</span><span className="micro-label">SELECTED / 2023—2024</span></div>
   <div className="exhibition-title-row"><h2 id="selected-title">Selected <em>realities.</em></h2><p>Four different problems. One obsession: engineering complex systems into interfaces people understand.</p></div>
   <div className="exhibition-shell" aria-label="Interactive gallery of Archit Jain projects" onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();go(1)}if(e.key==='ArrowLeft'){e.preventDefault();go(-1)}}}>
    <div className="exhibition-toc"><div className="toc-head micro-label">INDEX / {String(total).padStart(2,'0')}</div>
      {projects.map((p,i)=><button key={p.id} type="button" className={'toc-item '+(current===i?'toc-active':'')} aria-pressed={current===i} onPointerDown={()=>pick(i)} onClick={()=>pick(i)}><span>{p.id}</span><span>{p.name}</span><span className="toc-arrow">↗</span></button>)}
      <div className="toc-footer micro-label">DRAG / SELECT / USE ARROWS</div>
    </div>
    <div className="stage-wrap" data-fx-tilt data-cursor="drag" onPointerEnter={startTilt} onPointerMove={moveTilt} onPointerDown={e=>{if(e.pointerType==='mouse')mouseX.current=e.clientX}} onPointerUp={e=>{if(e.pointerType!=='mouse'||mouseX.current===null)return;const delta=e.clientX-mouseX.current;if(Math.abs(delta)>78)go(delta<0?1:-1);mouseX.current=null}} onPointerLeave={()=>{mouseX.current=null;stopTilt()}} onTouchStart={e=>{touchX.current=e.touches[0]?.clientX??null}} onTouchEnd={e=>{if(touchX.current===null)return;const delta=(e.changedTouches[0]?.clientX??0)-touchX.current;if(Math.abs(delta)>44)go(delta<0?1:-1);touchX.current=null}}>
      <div className="stage-backdrop" aria-hidden="true"/><div className="stage-back-number" aria-hidden="true">{selected.id}</div>
      <div className="project-stage">
       {projects.map((p,i)=>{const offset=(i-current+total)%total;return <div key={p.id} className={'stage-layer '+(offset===0?'layer-active':offset===1?'layer-next':'layer-away')} aria-hidden={offset!==0} style={{'--depth':String(offset)} as React.CSSProperties}><ProjectArt project={p}/></div>})}
      </div>
      <div className="stage-controller"><span className="micro-label">SPATIAL ARCHIVE / {selected.id}—04</span><div><button type="button" aria-label="Previous project" onClick={()=>go(-1)}>←</button><button type="button" aria-label="Next project" onClick={()=>go(1)}>→</button></div></div>
    </div>
    <div className="project-spotlight" aria-live="polite" aria-atomic="true">
      <div className="spotlight-eyebrow micro-label">{selected.id} / {selected.type} <span>{selected.year}</span></div>
      <h3 key={selected.id+'title'}>{selected.name}<span className="spotlight-star">✳</span></h3>
      <p className="spotlight-lead" key={selected.id+'lead'}>{selected.lead}</p>
      <p className="spotlight-description">{selected.description}</p>
      <div className="spotlight-meta"><span className="micro-label">ROLE / {selected.role}</span><span className="micro-label">{selected.tags.join(' · ')}</span></div>
      <a href={selected.url} target="_blank" rel="noopener noreferrer" className="outline-link" data-cursor="view">{selected.url.includes('github.com')?'Explore source':'Visit project'}<span>↗</span></a>
    </div>
   </div>
   <div className="exhibition-end"><span className="micro-label">ALL PROJECTS / ALL ROLES / ALL OUTCOMES</span><Link href="/work" className="text-link">View full project archive <span>↗</span></Link></div>
  </div>
 </section>
}
