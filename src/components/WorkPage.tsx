import Link from 'next/link';
import {LocoHeader,LocoFooter} from '@/components/LocomotiveChrome';
import {ProjectCover} from '@/components/LocomotiveHome';
import {person,projects} from '@/lib/content';
export function WorkPage(){return <><LocoHeader/><main className="l-inner-page">
 <section className="l-inner l-inner-hero"><div className="l-inner-kicker"><span>ARCHIT JAIN / THE ARCHIVE</span><span>SELECTED PROJECTS 2023—2024</span></div><h1 className="l-inner-title">Selected<br/><em>work.</em></h1><p className="l-inner-intro">Four real projects. Different challenges. One approach: digital experiences that feel simple, work hard, and last.</p></section>
 <section className="l-work-page-section l-inner"><div className="l-section-overline"><span>ALL PROJECTS</span><span>(04)</span></div>
  {projects.map(p=><article key={p.slug} id={p.slug} className="l-case">
   <div className="l-case-art"><ProjectCover project={p} large/></div><div className="l-case-copy"><div className="l-case-meta"><span>PROJECT {p.id} / 04</span><span>{p.year}</span></div><h2>{p.name}</h2><h3>{p.lead}</h3><p>{p.description}</p><p><strong>ROLE</strong> / {p.role}<br/><strong>OUTCOME</strong> / {p.impact}</p><div className="l-case-tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div><a className="l-arrow-button" target="_blank" rel="noopener noreferrer" href={p.url}>{p.url.includes('github.com')?'VIEW SOURCE':'VIEW LIVE PROJECT'} <span>↗</span></a></div>
  </article>)}
 </section><div className="l-inner l-mini-footer"><Link href="/" className="l-arrow-button">BACK TO HOME <span>↗</span></Link><a href={'mailto:'+person.email}>START PROJECT ↗</a></div>
 </main><LocoFooter/></>}