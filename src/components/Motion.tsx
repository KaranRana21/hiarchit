"use client";
import { useEffect } from "react";
export function Motion(){
  useEffect(()=>{
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if(reduce)return;
    let mounted=true;let teardown=()=>{};
    Promise.all([import("gsap"),import("gsap/ScrollTrigger")]).then(([{gsap},{ScrollTrigger}])=>{
      if(!mounted)return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx=gsap.context(()=>{
        gsap.fromTo(".hero-word",{yPercent:120},{yPercent:0,duration:1.1,stagger:.13,ease:"power4.out"});
        gsap.fromTo(".hero-role,.hero-subline,.hero-social,.hero-meta",{opacity:0,y:22},{opacity:1,y:0,duration:.8,stagger:.12,delay:.32,ease:"power3.out"});
        gsap.utils.toArray<HTMLElement>(".reveal").forEach(el=>gsap.fromTo(el,{opacity:0,y:48},{opacity:1,y:0,duration:.9,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 88%",once:true}}));
        gsap.utils.toArray<HTMLElement>(".section-mast").forEach(el=>gsap.fromTo(el,{opacity:0},{opacity:1,duration:.65,scrollTrigger:{trigger:el,start:"top 93%",once:true}}));
      });
      teardown=()=>ctx.revert();
    }).catch(()=>{});
    return()=>{mounted=false;teardown();};
  },[]);
  return null;
}
