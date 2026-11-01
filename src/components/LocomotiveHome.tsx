'use client';
import Link from 'next/link';
import Image from 'next/image';
import {useEffect,useState} from 'react';
import {LocoHeader,LocoFooter} from '@/components/LocomotiveChrome';
import {person,projects,articles,originalArticleUrl,outcomes,competencies,achievements,Project} from '@/lib/content';

export function ProjectCover({project,large=false}:{project:Project;large?:boolean}){
 return <div className={'l-cover l-cover-'+project.art+(large?' is-large':'')} aria-label={'Conceptual artwork for '+project.name}>
  <div className="l-cover-top"><span>AJ® / SELECTED WORK</span><span>{project.id} — {project.year}</span></div>
  <div className="l-cover-atmosphere" aria-hidden="true"><i/><i/><i/></div>
  <div className="l-cover-center"><span className="l-cover-name">{project.name}</span><span className="l-cover-symbol" aria-hidden="true">{project.art==='civic'?'✳':project.art==='architecture'?'◈':project.art==='language'?'अ':'◎'}</span></div>
  <div className="l-cover-bottom"><span>{project.type}</span><span>CONCEPT STUDY / {project.tags[0]}</span></div>
 </div>
}

export function LocomotiveHome(){
 const [hovered,setHovered]=useState(-1);
 useEffect(()=>{
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('l-is-visible');observer.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -18px 0px'});
  document.querySelectorAll('.l-reveal').forEach(x=>observer.observe(x));
  return()=>observer.disconnect();
 },[]);
 return <>
  <LocoHeader/>
  <main>
   <section className="l-home-hero" id="top" aria-label="Archit Jain portfolio">
    <div className="l-hero-stage" aria-hidden="true">
     <div className="l-hero-panel l-hero-panel-left"><span className="l-hero-topcode">AJ / PORTFOLIO — 2026</span><div className="l-hero-graphics"><span>01</span><span>DESIGN</span><span>×</span><span>CODE</span></div></div>
     <div className="l-hero-portrait"><Image priority unoptimized src={person.portrait} alt="" width={900} height={1100}/></div>
     <div className="l-hero-noise"/>
     <div className="l-hero-sidecode">BUILT WITH INTENTION — BUILT FOR PEOPLE</div>
    </div>
    <div className="l-hero-text l-inner">
     <span className="l-hero-eyebrow">INDEPENDENT FRONTEND ENGINEER <span>INDIA / WORLDWIDE</span></span>
     <h1><span className="l-hero-word">ARCHIT<sup>®</sup></span><span className="l-hero-subline">Digital-first<br/>Frontend Engineer <b>✳</b></span></h1>
     <div className="l-hero-bottom"><span>ENGINEERING THAT FEELS HUMAN.</span><a href="#featured">DISCOVER WORK <span aria-hidden="true">↓</span></a></div>
    </div>
   </section>

   <section className="l-summary l-inner" id="intro">
    <div className="l-summary-overline"><span>© 2022—2026</span><span>ENGINEERING / EXPERIENCE / CRAFT</span></div>
    <div className="l-summary-stage">
     <div className="l-summary-headlines l-reveal"><span>Four projects.</span><span>One intention.</span><span>Built to matter.</span></div>
     <div className="l-summary-ring" aria-hidden="true"><div className="l-ring-orbit"><div className="l-ring-inner"><strong>AJ</strong><span>2026</span></div></div><span className="l-ring-spec spec-a">+</span><span className="l-ring-spec spec-b">+</span></div>
     <div className="l-summary-caption"><p>Thoughtful interfaces.<br/>Serious engineering.</p><Link href="/work" className="l-arrow-button">EXPLORE ALL PROJECTS <span>↗</span></Link></div>
    </div>
   </section>

   <section className="l-features" id="featured">
    <div className="l-inner l-section-overline"><span>FEATURED WORK</span><span>01 — 04</span></div>
    <div className="l-work-list" onMouseLeave={()=>setHovered(-1)}>
     {projects.map((p,i)=><Link key={p.id} href={'/work#'+p.slug} className={'l-feature-item '+(hovered!==-1&&hovered!==i?'is-muted':'')} onMouseEnter={()=>setHovered(i)} onFocus={()=>setHovered(i)}>
      <div className="l-inner l-feature-row"><span className="l-feature-index">0{i+1}</span><span className="l-feature-name">{p.name.split(' ').length>1?<><span>{p.name.split(' ')[0]}</span><span className="l-inline-cover"><ProjectCover project={p}/></span><span>{p.name.split(' ').slice(1).join(' ')}</span></>:<>{p.name}<span className="l-inline-cover"><ProjectCover project={p}/></span></>}</span><span className="l-feature-arrow">↗</span></div>
      <span className="l-feature-mobile-label">{p.type} / {p.year}</span>
     </Link>)}
     <Link className="l-feature-item l-feature-cta" href="/work"><div className="l-inner l-feature-row"><span className="l-feature-index">↳</span><span className="l-feature-name">All work <sup>04</sup></span><span className="l-feature-arrow">↗</span></div></Link>
    </div>
   </section>

   <section className="l-manifesto l-inner" id="about">
    <span className="l-small-label">02 / THE PERSON BEHIND THE PIXELS</span>
    <h2 className="l-manifesto-title l-reveal"><span className="l-manifesto-icon">✳</span>Design and code are only tools. What makes an experience remarkable is knowing <em>why it matters</em> to people. I build the systems that make it work.<span className="l-manifesto-end">↗</span></h2>
    <div className="l-about-grid">
     <div className="l-about-image"><Image unoptimized src={person.portrait} width={800} height={1100} alt="Archit Jain, frontend engineer" loading="lazy"/><span>MEET ARCHIT JAIN / 2026</span></div>
     <div className="l-about-copy"><div className="l-meta-num">A / J</div><h3>The human<br/>side of code.</h3><p>{person.bio}</p><p>Currently {person.job.role} at {person.job.company}. Computer Science graduate from {person.education.university}.</p><div className="l-about-links"><a className="l-arrow-button" href={person.resume} target="_blank" rel="noreferrer">DOWNLOAD RÉSUMÉ <span>↗</span></a><a className="l-arrow-button" href={person.linkedin} target="_blank" rel="noreferrer">LINKEDIN <span>↗</span></a></div></div>
    </div>
   </section>

   <section className="l-facts">
    <div className="l-inner"><div className="l-section-overline"><span>REAL WORK. MEASURABLE IMPACT.</span><span>03 / HIGHLIGHTS</span></div>
     <div className="l-facts-grid">{outcomes.map((o,i)=><div className="l-fact" key={o.value}><span>0{i+1}</span><strong>{o.value}</strong><p>{o.label}</p></div>)}</div>
    </div>
   </section>

   <section className="l-capabilities l-inner" id="expertise"><div className="l-extras-heading"><h2>Capabilities</h2><span>(03)</span></div>
    {competencies.map((c,i)=><div className="l-cap-row" key={c.n}><span className="l-cap-number">0{i+1}</span><h3>{c.title}</h3><p>{c.items.join(' / ')}</p><span className="l-cap-arrow">↗</span></div>)}
   </section>

   <section className="l-experience l-inner"><div className="l-section-overline"><span>WHERE I&apos;VE BEEN</span><span>THE TIMELINE</span></div>
    <div className="l-experience-grid"><h2>Still<br/><i>building.</i></h2><div><span className="l-small-label">2022 — PRESENT</span><h3>{person.job.company}</h3><p>{person.job.role}</p><p>{achievements[0]}</p><div className="l-rule"/><span className="l-small-label">{person.education.period}</span><h3>{person.education.university}</h3><p>{person.education.degree}</p></div></div>
   </section>

   <section className="l-extras l-inner" id="notes"><div className="l-extras-heading"><h2>Extras</h2><span>(06)</span></div>
    <div className="l-extras-grid"><div className="l-extras-label">ARTICLES<br/>WRITING / 2026</div><div className="l-extras-items">
     {articles.map((a,i)=><a href={originalArticleUrl(a.slug)} key={a.slug} target="_blank" rel="noreferrer"><span className="l-extras-index">0{i+1}</span><span>{a.title}</span><b>↗</b></a>)}
     <Link href="/journal" className="l-extras-more">SEE ALL NOTES <span>↗</span></Link>
    </div></div>
   </section>
  </main>
  <LocoFooter/>
 </>;
}
