'use client';
import {useState} from 'react';
import {GravityChamber3D} from '@/components/GravityChamber3D';
import {person} from '@/lib/content';

export function HeroReborn(){
 const [paused,setPaused]=useState(false);
 return <section className="gravity-hero" id="top" aria-label="Archit Jain's portfolio — Gravity Chamber">
  <div className="gravity-hero-aura" aria-hidden="true"/>
  <div className="gravity-hero-grid" aria-hidden="true"><span/><span/><span/><span/><span/></div>
  <div className="gravity-hero-top frame">
   <span className="gravity-index"><span className="gravity-index-symbol">✳</span> PERSONAL PORTFOLIO / ARCHIT JAIN</span>
   <span className="gravity-top-right">FRONTEND ENGINEERING <span>—</span> 2026</span>
  </div>
  <div className="gravity-hero-content frame">
   <div className="gravity-hero-copy">
    <div className="gravity-hero-presence"><span className="gravity-presence-dot"/> THE HUMAN BEHIND THE INTERFACE</div>
    <h1 className="gravity-hero-title">
     <span className="gravity-hero-name">ARCHIT JAIN <span>/ FRONTEND ENGINEER</span></span>
     <span className="gravity-headline-line gravity-headline-first">DIGITAL</span>
     <span className="gravity-headline-line gravity-headline-second">IN <em>MOTION.</em></span>
    </h1>
    <p className="gravity-hero-deck">Making complex systems feel instinctive. Building digital experiences with precision, intuition, and a restless eye for detail.</p>
    <div className="gravity-hero-actions">
     <a href="#selected-work" className="gravity-primary-action"><span>EXPLORE SELECTED WORK</span><span className="gravity-action-arrow" aria-hidden="true">↗</span></a>
     <a href={person.resume} target="_blank" rel="noopener noreferrer" className="gravity-secondary-action">VIEW RÉSUMÉ <span aria-hidden="true">↗</span></a>
    </div>
   </div>
   <div className="gravity-hero-object">
    <div className="gravity-object-halo" aria-hidden="true"/>
    <div className="gravity-object-axis axis-one" aria-hidden="true"/>
    <div className="gravity-object-axis axis-two" aria-hidden="true"/>
    <div className="gravity-object-scene"><GravityChamber3D paused={paused}/></div>
    <div className="gravity-object-topline"><span>01 / KINETIC STUDY</span><span>AJ—001</span></div>
    <div className="gravity-object-caption">
     <div><span className="gravity-object-overline">OBJECT / 001</span><strong>THE GRAVITY<br/>CHAMBER</strong></div>
     <div className="gravity-object-operation"><span className="gravity-object-interaction">DRAG TO ORBIT</span><button type="button" aria-pressed={paused} className="gravity-motion-toggle" onClick={()=>setPaused(v=>!v)}>{paused?'RESUME MOTION':'PAUSE MOTION'} <span aria-hidden="true">{paused?'▶':'Ⅱ'}</span></button></div>
    </div>
   </div>
  </div>
  <div className="gravity-hero-foot frame">
   <span className="gravity-foot-label">EXPERIENCES BUILT FOR HUMANS, NOT JUST SCREENS.</span>
   <a href="#statement" className="gravity-foot-scroll"><span className="gravity-scroll-line" aria-hidden="true"/> SCROLL TO DISCOVER <span aria-hidden="true">↓</span></a>
   <span className="gravity-foot-coordinate">28° N / INFINITE CURIOSITY</span>
  </div>
 </section>
}
