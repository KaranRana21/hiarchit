import type {Project} from '@/lib/content';
export function ProjectArt({project}:{project:Project}){return <div className={'concept-art concept-'+project.art} role="img" aria-label={'Art-directed abstract visualization of '+project.name+'; not a screenshot'}>
  <div className="concept-grid"/><div className="concept-no">ARCHIVE / {project.id}</div>
  {project.art==='civic'&&<div className="civic-object"><div className="civic-globe"/><span className="civic-wire wire-a"/><span className="civic-wire wire-b"/><span className="civic-label">UNIFIED<br/>INDIA</span></div>}
  {project.art==='architecture'&&<div className="building-object"><div className="building-face face-a"/><div className="building-face face-b"/><div className="building-face face-c"/><div className="building-tower">ITPO</div></div>}
  {project.art==='language'&&<div className="language-object"><span className="language-script">अ</span><span className="language-arrow">→</span><span className="language-english">A</span><div className="language-orbit"/></div>}
  {project.art==='ai'&&<div className="ai-object"><div className="ai-crystal"><i/><i/><i/><i/></div><span className="ai-name">TT / INTELLIGENCE</span></div>}
  <div className="concept-bottom"><span>IMAGINED VISUAL / {project.year}</span><span>↗</span></div>
 </div>}
