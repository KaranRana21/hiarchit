import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";
export const metadata: Metadata = { title: "Work", description: "Selected websites, commerce builds and creative engineering projects by Karan Rana." };
export default function Work() {
  return <main className="subpage"><header className="subpage-header"><Link className="brand" href="/">K<span>R</span><i>.</i></Link><nav aria-label="Secondary navigation"><Link href="/">HOME ↖</Link><Link href="/journal">NOTES ↗</Link></nav></header><div className="subpage-hero"><span className="eyebrow">001 / SELECTED PROJECTS</span><h1>THE WORK<br/><em>DOES TALK.</em></h1><p>Some are concepts. Some are live products. Each starts with purpose and earns its own visual language.</p></div><div className="work-index">{projects.map(p => <a key={p.slug} className="work-row" href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${p.name}`}><span>{p.number}</span><h2>{p.name}</h2><p>{p.summary}</p><span>{p.year}</span><span className="large-arrow">↗</span></a>)}</div><footer className="subpage-footer"><Link href="/">← BACK HOME</Link><a href="mailto:hello@kailasam.dev">START A PROJECT ↗</a></footer></main>;
}
