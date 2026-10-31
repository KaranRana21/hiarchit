import type {Project} from '@/lib/content';
import type {CSSProperties} from 'react';
export function ProjectArt({project}:{project:Project}){
 return <div className={'project-art project-art-'+project.art} style={{'--tone':project.tone} as CSSProperties} role="img" aria-label={'Conceptual visual diagram for '+project.name+', not actual product screenshot'}>
   <div className="art-grid"/><span className="art-corner art-corner-tl">+</span><span className="art-corner art-corner-tr">+</span><span className="art-corner art-corner-bl">+</span><span className="art-corner art-corner-br">+</span>
   {project.art==='civic'&&<div className="art-object art-civic"><div className="civic-orbit orbit-a"/><div className="civic-orbit orbit-b"/><div className="civic-center">01<span> / PUBLIC</span></div><div className="civic-node node-a"/><div className="civic-node node-b"/><div className="civic-node node-c"/></div>}
   {project.art==='architecture'&&<div className="art-object art-architecture"><div className="architecture-plane plane-one"/><div className="architecture-plane plane-two"/><div className="architecture-plane plane-three"/><div className="architecture-circle">ITPO</div></div>}
   {project.art==='language'&&<div className="art-object art-language"><span className="lang-glyph glyph-one">अ</span><span className="lang-glyph glyph-two">A</span><div className="lang-connector"><span/><span/><span/></div><span className="lang-caption">TRANSLATE / TRANSCEND</span></div>}
   {project.art==='ai'&&<div className="art-object art-ai"><div className="ai-graph"><i/><i/><i/><i/><i/><i/></div><div className="ai-center">TT<span> / 04</span></div></div>}
   <div className="art-bottom mono"><span>FIG. {project.id} / ARTISTIC INTERPRETATION</span><span>{project.year} ↗</span></div>
 </div>
}
