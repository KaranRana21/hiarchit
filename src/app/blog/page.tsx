import type { Metadata } from "next";
import Link from "next/link";
import { Chrome } from "@/components/Chrome";
import { Motion } from "@/components/Motion";
import { notes } from "@/lib/notes";
export const metadata: Metadata = { title: "Field Notes", description: "Notes on creative development, performance and web engineering." };
export default function Blog(){return <main><Chrome/><Motion/><div className="subpage"><section className="subpage-hero"><span className="subpage-index">02 / THOUGHTS & PROCESS</span><h1>FIELD<br/><span className="outline">NOTES</span><em>.</em></h1><p className="subpage-lead">Short reflections from intersection of design, frontend engineering and production systems.</p></section><section className="blog-grid" aria-label="Field notes">{notes.map((note,index)=><Link href={`/blog/${note.slug}`} key={note.slug} className="blog-card reveal"><span>0{index+1} / {note.category}</span><h2>{note.title} ↗</h2><p>{note.summary}</p><hr/><small>READ THE NOTE ↗</small></Link>)}</section><div className="subpage-footer"><span>WRITTEN WITH INTENT</span><Link href="/">← BACK HOME</Link><Link href="/work">VIEW WORK ↗</Link></div></div></main>}
