"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Sculpture } from "./Sculpture";
import { projects } from "@/lib/projects";

const notes = [
  { n: "01", label: "CRAFT", title: "Design that survives the build.", detail: "Why good composition matters before animation." },
  { n: "02", label: "ENGINEERING", title: "Fast isn't a feature. It's a feeling.", detail: "A practical view on performance, from WordPress to Next.js." },
  { n: "03", label: "PROCESS", title: "Less motion. Better moments.", detail: "Deliberate interaction beats animation everywhere." }
];

export function Portfolio() {
  const rootRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeWork, setActiveWork] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let dead = false;
    let teardown = () => {};
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (dead) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        gsap.fromTo(".hero-display .line-inner", { yPercent: 110 }, { yPercent: 0, duration: 1.22, stagger: 0.13, ease: "power4.out", delay: 0.18 });
        gsap.fromTo(".hero-copy > *", { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.72, stagger: 0.12, ease: "power3.out", delay: 0.7 });
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach(el => {
          gsap.fromTo(el, { y: 42, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 89%", once: true } });
        });
        gsap.utils.toArray<HTMLElement>(".project-card").forEach((el, i) => {
          gsap.fromTo(el, { y: 56, opacity: 0 }, { y: 0, opacity: 1, duration: 0.95, delay: (i % 2) * 0.07, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
        });
      }, root);
      teardown = () => { ctx.revert(); ScrollTrigger.getAll().forEach(t => t.kill()); };
    }).catch(() => {});
    return () => { dead = true; teardown(); };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onEscape = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [menuOpen]);

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText("hello@kailasam.dev"); setCopied(true); window.setTimeout(() => setCopied(false), 1900); }
    catch { window.location.href = "mailto:hello@kailasam.dev"; }
  };

  return <main ref={rootRef}>
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Karan Rana homepage">K<span>R</span><i>.</i></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        <a href="#work">Work <sup>05</sup></a><a href="#about">About</a><Link href="/journal">Notes</Link><a href="#contact">Contact</a>
      </nav>
      <a className="availability" href="mailto:hello@kailasam.dev"><span className="availability-dot"/>AVAILABLE FOR SELECT PROJECTS <span className="header-arrow">↗</span></a>
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}><span/><span/></button>
    </header>
    <nav id="mobile-navigation" className={`mobile-menu ${menuOpen ? "open" : ""}`} aria-label="Mobile navigation" inert={!menuOpen}>
      <a onClick={() => setMenuOpen(false)} href="#work">Work <span>01</span></a><a onClick={() => setMenuOpen(false)} href="#about">About <span>02</span></a><Link onClick={() => setMenuOpen(false)} href="/journal">Notes <span>03</span></Link><a onClick={() => setMenuOpen(false)} href="#contact">Contact <span>04</span></a>
    </nav>

    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true"/>
      <div className="hero-index"><span>INDEPENDENT CREATIVE DEVELOPER</span><span>BASED IN INDIA · WORKING EVERYWHERE</span></div>
      <div className="hero-content">
        <div className="hero-identity"><span className="hero-kicker"><b className="small-star">✳</b> DESIGN MEETS ENGINEERING</span>
          <h1 className="hero-display" id="hero-title"><span className="line"><span className="line-inner">KARAN</span></span><span className="line outline"><span className="line-inner">RANA<span className="display-dot">.</span></span></span></h1>
          <div className="hero-copy"><p>Building digital things that<br/><strong>look different. Work harder.</strong></p><a href="#work" className="round-link"><span>EXPLORE WORK</span><span className="round-icon">↘</span></a></div>
        </div>
        <div className="hero-art"><div className="orbit-label orbit-label-1">FORM<br/>MEETS<br/>FUNCTION</div><Sculpture/><span className="orbital-tag">CREATIVE DEV / 001</span><div className="orbit-label orbit-label-2">THE ART OF<br/>MAKING IT WORK.</div></div>
      </div>
      <div className="hero-foot"><span>SCROLL TO EXPLORE <span className="arrow-down">↓</span></span><span>PORTFOLIO / VOL. 01 — 2026</span><span>28° 36′ N — ALWAYS BUILDING</span></div>
    </section>

    <section className="statement" id="about">
      <div className="section-overline" data-reveal><span><i className="section-disc"/>01 / INTRODUCTION</span><span>BETWEEN AESTHETICS & ARCHITECTURE</span></div>
      <div className="statement-grid"><div className="statement-aside" data-reveal><span className="star-large">✳</span><p>NOT JUST<br/>ANOTHER<br/>WEB PAGE.</p></div>
        <div data-reveal><h2>I MAKE <em>COMPLEX</em> THINGS FEEL <span className="underlined">SIMPLE.</span></h2><div className="statement-foot"><p>Creative developer with roots in frontend engineering, WordPress systems and infrastructure. I bring design thinking and production discipline into same room.</p><a href="#expertise" className="text-link">MORE ABOUT ME <span>↗</span></a></div></div></div>
    </section>

    <section className="work-section" id="work">
      <div className="section-overline" data-reveal><span><i className="section-disc"/>02 / SELECTED WORK</span><span>BUILT WITH INTENT, NOT TEMPLATES</span></div>
      <div className="work-heading" data-reveal><h2>PROOF IN<br/><em>THE PIXELS.</em></h2><p>Different briefs.<br/>One obsession: detail.</p></div>
      <div className="project-grid">
        {projects.slice(0, 4).map((project, index) => <a key={project.slug} className={`project-card project-card-${index + 1}`} href={project.url} target="_blank" rel="noopener noreferrer" onMouseEnter={() => setActiveWork(index)} aria-label={`Visit ${project.name} website`}>
          <div className={`project-art project-art-${project.theme}`}><span className="project-art-grid"/><div className="project-art-center">{project.theme === "mountain" ? <div className="mountain-mark">◭</div> : null}{project.theme === "fpv" ? <div className="fpv-mark">✳</div> : null}<span>{project.initials}</span></div><span className="project-art-caption">{project.category}</span><span className="project-art-asterisk">✳</span><span className="project-go">↗</span></div>
          <div className="project-meta"><div><span className="project-number">/{project.number} — {project.category}</span><h3>{project.name}</h3><p>{project.summary}</p></div><span className="project-year">{project.year}</span></div>
        </a>)}
      </div>
      <div className="work-bottom" data-reveal><span>SHOWING <strong>04</strong> OF <strong>05</strong> PROJECTS</span><Link href="/work" className="btn dark">ALL PROJECTS <span>↗</span></Link><span className="work-active">0{activeWork + 1} / 04</span></div>
    </section>

    <section className="marquee" aria-label="Disciplines"><div className="marquee-track" aria-hidden="true">DESIGN <span>✳</span> CODE <span>✳</span> MOTION <span>✳</span> SYSTEMS <span>✳</span> DESIGN <span>✳</span> CODE <span>✳</span> MOTION <span>✳</span> SYSTEMS <span>✳</span></div></section>

    <section className="expertise" id="expertise">
      <div className="section-overline on-dark" data-reveal><span><i className="section-disc"/>03 / WHAT I DO</span><span>THE FULL PICTURE</span></div>
      <div className="expertise-intro" data-reveal><p>FROM FIRST SKETCH<br/>TO FINAL DEPLOY</p><h2>GOOD WORK<br/><em>IS BUILT.</em></h2></div>
      <div className="expertise-row" data-reveal><span>01</span><h3>Creative development</h3><p>Next.js, React, motion and responsive interfaces that feel considered.</p><span className="expertise-symbol">↗</span></div>
      <div className="expertise-row" data-reveal><span>02</span><h3>WordPress & commerce</h3><p>Custom builds, WooCommerce, migrations, security and performance.</p><span className="expertise-symbol">↗</span></div>
      <div className="expertise-row" data-reveal><span>03</span><h3>Systems & infrastructure</h3><p>Hosting, DNS, email, deployments and reliable production workflows.</p><span className="expertise-symbol">↗</span></div>
      <div className="expertise-bottom" data-reveal><div><strong>3+</strong><span>YEARS BUILDING</span></div><div><strong>80+</strong><span>WORDPRESS SITES MANAGED</span></div><div><strong>∞</strong><span>WAYS TO IMPROVE</span></div></div>
    </section>

    <section className="process">
      <div className="section-overline" data-reveal><span><i className="section-disc"/>04 / MINDSET</span><span>LESS NOISE, MORE SIGNAL</span></div>
      <div className="process-wrap"><div data-reveal><span className="process-star">✳</span><h2>DESIGN<br/>WITH <em>REASON.</em></h2></div><div className="process-copy" data-reveal><p>Every decision should earn its place. Striking visuals. Thoughtful movement. Clean code. No performance tax for decoration.</p><p>I care about what visitors feel and what happens under hood. Both matter.</p><a href="https://www.kailasam.dev" target="_blank" rel="noopener noreferrer" className="text-link">MEET MY STUDIO <span>↗</span></a></div></div>
    </section>

    <section className="journal-preview">
      <div className="section-overline" data-reveal><span><i className="section-disc"/>05 / FIELD NOTES</span><span>THINGS WORTH THINKING ABOUT</span></div>
      <div className="journal-top" data-reveal><h2>THOUGHTS<br/><em>IN PROGRESS.</em></h2><Link className="text-link" href="/journal">ALL NOTES <span>↗</span></Link></div>
      <div className="notes-list">{notes.map(note => <Link key={note.n} href="/journal" className="note-row"><span>{note.n} / {note.label}</span><h3>{note.title}</h3><span className="note-arrow">↗</span></Link>)}</div>
    </section>

    <section className="contact" id="contact"><div className="section-overline on-contact" data-reveal><span><i className="section-disc"/>06 / SAY HELLO</span><span>NEW IDEAS WELCOME</span></div><div className="contact-content"><p data-reveal>HAVE SOMETHING IN MIND?</p><h2 data-reveal>LET&apos;S MAKE<br/><em>IT REAL.</em></h2><div className="contact-actions" data-reveal><a href="mailto:hello@kailasam.dev" className="contact-email">HELLO@KAILASAM.DEV <span>↗</span></a><button onClick={copyEmail} type="button" className="copy-email" aria-live="polite">{copied ? "COPIED ✓" : "COPY EMAIL ↗"}</button></div></div><footer className="footer"><span>© {new Date().getFullYear()} KARAN RANA</span><div><a href="https://github.com/KaranRana21" target="_blank" rel="noopener noreferrer">GITHUB ↗</a><a href="https://www.kailasam.dev" target="_blank" rel="noopener noreferrer">KAILASAM.DEV ↗</a><a href="#top">BACK TO TOP ↑</a></div><span>DESIGNED TO BE FELT. BUILT TO LAST.</span></footer></section>
  </main>;
}
