'use client';
import {useEffect} from 'react';
export function Motion(){useEffect(()=>{
 if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 let ctx:{revert:()=>void}|undefined;
 let alive=true;
 (async()=>{const {default:gsap}=await import('gsap');const {ScrollTrigger}=await import('gsap/ScrollTrigger');if(!alive)return;gsap.registerPlugin(ScrollTrigger);
 ctx=gsap.context(()=>{
  gsap.fromTo('.hero-line .line-inner',{yPercent:114,rotate:2},{yPercent:0,rotate:0,duration:1.45,stagger:.16,ease:'power4.out',delay:.12});
  gsap.fromTo('.hero-micro, .hero-footnote',{opacity:0,y:24},{opacity:1,y:0,duration:.75,stagger:.09,ease:'power2.out',delay:.58});
  document.querySelectorAll('[data-reveal]').forEach(el=>gsap.fromTo(el,{y:36,opacity:0},{y:0,opacity:1,duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 92%',once:true}}));
  document.querySelectorAll('.project-record').forEach(el=>gsap.fromTo(el,{opacity:.6,y:24},{opacity:1,y:0,duration:.75,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 94%',once:true}}));
 });})();return()=>{alive=false;ctx?.revert()}
},[]);return null}
