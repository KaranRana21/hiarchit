"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { identity } from "@/lib/site";
export function Chrome() {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const [copied,setCopied] = useState(false);
  const show = () => { setOpen(false); dialog.current?.showModal(); };
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return ()=>{ document.body.style.overflow=""; }; },[open]);
  useEffect(() => { const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); }; document.addEventListener("keydown",onKey);return()=>document.removeEventListener("keydown",onKey); },[]);
  async function copy(){try{await navigator.clipboard.writeText(identity.email);setCopied(true);window.setTimeout(()=>setCopied(false),1500);}catch{window.location.href=`mailto:${identity.email}`;}}
  return <>
    <header className="topbar"><Link href="/" className="logo" aria-label="Home">{identity.short}<span>.</span></Link><nav className="desktop-links" aria-label="Main navigation"><Link href="/work">WORK</Link><Link href="/blog">BLOG</Link><button onClick={show}>CONTACT <span className="nav-dot"/></button></nav><button className={`nav-burger ${open?"is-open":""}`} onClick={()=>setOpen(o=>!o)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open?"Close menu":"Open menu"}><span/><span/></button></header>
    <nav className={`mobile-links ${open?"is-open":""}`} id="mobile-menu" aria-label="Mobile navigation" inert={!open}><Link onClick={()=>setOpen(false)} href="/">HOME <span>01</span></Link><Link onClick={()=>setOpen(false)} href="/work">WORK <span>02</span></Link><Link onClick={()=>setOpen(false)} href="/blog">BLOG <span>03</span></Link><button onClick={show}>CONTACT <span>04</span></button></nav>
    <dialog className="contact-dialog" ref={dialog} onClick={e=>{if(e.target===dialog.current)dialog.current.close();}}><div className="contact-panel"><div className="dialog-top"><span>AVAILABLE FOR CONVERSATION</span><button type="button" onClick={()=>dialog.current?.close()} aria-label="Close contact panel">CLOSE ×</button></div><span className="contact-index">GET IN TOUCH / 2026</span><h2>LET’S<br/><span>CONNECT.</span></h2><div className="contact-bottom"><span>HAVE SOMETHING IN MIND?</span><a href={`mailto:${identity.email}`}>{identity.email} ↗</a><button onClick={copy}>{copied?"COPIED":"COPY EMAIL"}</button></div><div className="contact-dialog-foot"><a href={identity.github} target="_blank" rel="noopener noreferrer">GITHUB ↗</a><a href={identity.studio} target="_blank" rel="noopener noreferrer">KAILASAM.DEV ↗</a></div></div></dialog>
  </>;
}
