import { timeline } from "@/lib/site";
export function Experience() {
  return <section className="experience-section" id="experience">
    <div className="section-mast"><span>03 / THE JOURNEY</span><span>BUILT IN PRACTICE, NOT THEORY</span></div>
    <div className="exp-intro"><div className="heading-stack"><h2>WORK</h2><h2 className="outline">HISTORY<span className="lime-dot">.</span></h2></div><p>From fixing infrastructure behind scenes to building expressive digital products on screen. Both sides of web matter.</p></div>
    <div className="timeline">{timeline.map((item, index) => <article className="timeline-item reveal" key={item.id}>
      <span className="timeline-watermark" aria-hidden="true">{item.id}</span>
      <div className="timeline-top"><span>{item.id} / 0{timeline.length}</span><span>{item.period}</span></div>
      <div className="timeline-content"><div className="timeline-role"><h3>{item.role}</h3>{item.orgUrl ? <a href={item.orgUrl} target="_blank" rel="noopener noreferrer">{item.org} ↗</a> : <span>{item.org}</span>}</div><div className="timeline-details"><p>{item.summary}</p><ul>{item.bullets.map(v=><li key={v}>{v}</li>)}</ul><div className="tag-list">{item.tags.map(tag=><span key={tag}>{tag}</span>)}</div></div></div>
      {index === 0 && <span className="timeline-line" aria-hidden="true"/>}
    </article>)}</div>
  </section>;
}
