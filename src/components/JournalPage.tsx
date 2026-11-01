import Link from 'next/link';
import {LocoHeader,LocoFooter} from '@/components/LocomotiveChrome';
import {articles,originalArticleUrl} from '@/lib/content';
export function JournalPage(){return <><LocoHeader/><main className="l-inner-page">
 <section className="l-inner l-inner-hero"><div className="l-inner-kicker"><span>ARCHIT JAIN / IDEAS IN PROGRESS</span><span>WRITING / 2026</span></div><h1 className="l-inner-title">Field<br/><em>notes.</em></h1><p className="l-inner-intro">Thinking aloud about frontend systems, design, AI tools, and everything changing how we build for the web.</p></section>
 <section className="l-inner l-journal-list">{articles.map((a,i)=><a key={a.slug} className="l-article-row" href={originalArticleUrl(a.slug)} target="_blank" rel="noopener noreferrer">
  <span className="l-n">0{i+1}</span><div><h2>{a.title}</h2><p>{a.summary} <span>— {a.tags.join(' / ')} · {a.mins}</span></p></div><time>{a.date}</time><span className="l-arr">↗</span>
 </a>)}</section>
 <div className="l-inner l-mini-footer"><Link href="/" className="l-arrow-button">BACK TO HOME <span>↗</span></Link></div>
 </main><LocoFooter/></>}