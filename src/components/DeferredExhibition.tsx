'use client';

import {lazy,Suspense,useEffect,useRef,useState} from 'react';
import Link from 'next/link';

/* Keep heavy 3D case-study gallery out of mobile first-paint hydration.
 * Real gallery code/chunks download only when visitor approaches this chapter.
 * Accessible static preview/link remains when JS unavailable. */
const Gallery=lazy(async()=>{
 const {SpatialWork}=await import('@/components/SpatialWork');
 return {default:SpatialWork};
});

function Preview(){
 return <section id="selected-work" className="exhibition exhibition-deferred" aria-label="Selected Archit projects">
  <div className="frame">
   <div className="section-heading-row"><span className="micro-label">02 — THE BODY OF WORK</span><span className="micro-label">SELECTED / 2023—2024</span></div>
   <div className="exhibition-title-row"><h2>Selected <em>realities.</em></h2><p>Four real projects. Built with care, crafted for people.</p></div>
   <Link href="/work" className="text-link">VIEW WORK ARCHIVE <span aria-hidden="true">↗</span></Link>
  </div>
 </section>;
}

export function DeferredExhibition(){
 const container=useRef<HTMLDivElement>(null);
 const [visible,setVisible]=useState(false);
 useEffect(()=>{
  const el=container.current;
  if(!el)return;
  if(!('IntersectionObserver' in window)){
   const timer=window.setTimeout(()=>setVisible(true),0);
   return()=>window.clearTimeout(timer);
  }
  const observer=new IntersectionObserver(entries=>{
   if(entries.some(e=>e.isIntersecting)){setVisible(true);observer.disconnect()}
  },{rootMargin:'550px 0px 550px 0px',threshold:0});
  observer.observe(el);
  return()=>observer.disconnect();
 },[]);
 return <div ref={container} className="deferred-exhibition">
  {visible?<Suspense fallback={<Preview/>}><Gallery/></Suspense>:<Preview/>}
 </div>;
}
