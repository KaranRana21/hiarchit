'use client';
import {useEffect} from 'react';
export function Motion(){useEffect(()=>{
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 let scope:{revert:()=>void}|undefined;
 let dead=false;
 (async()=>{
   const {default:gsap}=await import('gsap');
   const {ScrollTrigger}=await import('gsap/ScrollTrigger');
   if(dead)return;
   gsap.registerPlugin(ScrollTrigger);
   scope=gsap.context(()=>{
     gsap.fromTo('.opening .name-first',{opacity:0,yPercent:45},{opacity:1,yPercent:0,duration:1.5,delay:.15,ease:'power4.out'});
     gsap.fromTo('.opening .name-last',{opacity:0,yPercent:-35},{opacity:1,yPercent:0,duration:1.6,delay:.28,ease:'power4.out'});
     gsap.fromTo('.opening-bottom>*',{opacity:0,y:25},{opacity:1,y:0,duration:.9,stagger:.12,delay:.65,ease:'power2.out'});
     gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el=>{
       gsap.fromTo(el,{opacity:0,y:38},{opacity:1,y:0,duration:1.15,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%',once:true}});
     });
   });
 })();return()=>{dead=true;scope?.revert()};
 },[]);return null}
