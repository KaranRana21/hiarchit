import type { Metadata } from "next";
import Link from "next/link";
import { Chrome } from "@/components/Chrome";
import { Orbital } from "@/components/Orbital";
import { Motion } from "@/components/Motion";
import { projects } from "@/lib/projects";
export const metadata: Metadata = { title: "Selected Work", description: "Selected websites, creative experiences and web engineering projects by Karan Rana." };
export default function Work(){return <main><Chrome/><Motion/><div className="subpage"><section className="subpage-hero"><span className="subpage-index">01 / PORTFOLIO INDEX</span><h1>CRAFTED<br/><span className="outline">WITH CODE</span><em>.</em></h1><p className="subpage-lead">Ideas, interfaces and engineering that live on web. Explore selected builds and creative concepts.</p><div className="subpage-visual"><Orbital compact/></div></section><section className="subpage-work-list" aria-label="All projects">{projects.map((project,index)=><a className="subpage-project reveal" key={project.slug} href={project.url} target="_blank" rel="noopener noreferrer"><span className="project-number">0{index+1}</span><div><h2>{project.name}</h2><p>{project.summary}</p></div><span>{project.category}</span><span>{project.year}</span><span style={{fontSize:26}}>↗</span></a>)}</section><div className="subpage-footer"><span>{projects.length.toString().padStart(2,"0")} / PROJECTS</span><Link href="/">← BACK HOME</Link><Link href="/blog">READ BLOG ↗</Link></div></div></main>}
