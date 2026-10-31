"use client";
import Link from "next/link";
import { useState } from "react";
import { projects } from "@/lib/projects";

export function WorkShowcase(){
  const [hovered,setHovered] = useState(-1);
  return <section className="selected-work" id="selected-work">
    <div className="section-mast"><span>04 / SELECTED PROJECTS</span><span>THE THINGS THAT MADE IT OUT OF MY HEAD</span></div>
    <div className="work-intro reveal"><div className="heading-stack"><h2>SELECTED</h2><h2 className="outline">WORK<span className="lime-dot">.</span></h2></div><p>Different briefs. Same care for detail, usable interfaces and solid engineering.</p></div>
    <div className="projects-list">{projects.slice(0,4).map((project,index)=><a href={project.url} target="_blank" rel="noopener noreferrer" key={project.slug} className={`project-row reveal ${hovered===index?"hovered":""}`} onMouseEnter={()=>setHovered(index)} onMouseLeave={()=>setHovered(-1)}><span className="project-index">0{index+1}</span><div className="project-detail"><h3>{project.name}</h3><span>{project.summary}</span></div><div className={`project-thumbnail project-thumbnail-${project.theme}`} aria-hidden="true"><span>{project.initials}</span><b>↗</b></div><span className="project-category">{project.category}</span><span className="project-date">{project.year}</span><span className="project-arrow">↗</span></a>)}</div>
    <div className="work-footer"><span>01 — 04 / FEATURED PROJECTS</span><Link href="/work" className="pill-button">VIEW ALL WORK <span>↗</span></Link></div>
  </section>;
}
