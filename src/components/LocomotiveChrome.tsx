'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect,useState} from 'react';
import {person} from '@/lib/content';

export function LocoHeader(){
 const pathname=usePathname();
 const [menu,setMenu]=useState(false);
 const [scrolled,setScrolled]=useState(false);
 useEffect(()=>{const onScroll=()=>setScrolled(window.scrollY>window.innerHeight*.78);onScroll();window.addEventListener('scroll',onScroll,{passive:true});return()=>window.removeEventListener('scroll',onScroll)},[]);
 useEffect(()=>{if(!menu)return;const esc=(e:KeyboardEvent)=>{if(e.key==='Escape')setMenu(false)};window.addEventListener('keydown',esc);return()=>window.removeEventListener('keydown',esc)},[menu]);
 return <>
 <header className={'l-header '+((scrolled||pathname!=='/')?'l-header-light':'')+(menu?' l-header-open':'')}>
  <Link href="/" className="l-mark" aria-label="Archit Jain — Home"><span className="l-mark-shape" aria-hidden="true">✳</span> Archit<sup>®</sup></Link>
  <nav className="l-desktop-nav" aria-label="Main navigation">
   <Link href="/work">Work</Link><Link href="/#about">About</Link><Link href="/journal">Journal</Link>
  </nav>
  <a className="l-contact-nav" href={'mailto:'+person.email}>Let&apos;s talk <span aria-hidden="true">↗</span></a>
  <button className="l-menu-button" type="button" aria-label={menu?'Close menu':'Open menu'} aria-expanded={menu} onClick={()=>setMenu(v=>!v)}><span>{menu?'Close':'Menu'}</span><i className={menu?'crossed':''}><b/><b/></i></button>
 </header>
 <div className={'l-menu-overlay '+(menu?'l-menu-visible':'')} aria-hidden={!menu}>
  <div className="l-menu-top">INDEX — ARCHIT JAIN <span>2026</span></div>
  <nav aria-label="Expanded navigation">
   {[['01','Home','/'],['02','Selected work','/work'],['03','About','/#about'],['04','Journal','/journal']].map(([id,title,href])=>
    <Link key={id} href={href} tabIndex={menu?0:-1} onClick={()=>setMenu(false)}><small>{id}</small><span>{title}</span><b aria-hidden="true">↗</b></Link>)}
  </nav>
  <div className="l-menu-bottom"><span>ENGINEERED WITH INTENTION.</span><a href={'mailto:'+person.email}>{person.email} ↗</a></div>
 </div>
 </>;
}

export function LocoFooter(){
 return <footer className="l-footer" id="contact">
  <div className="l-inner"><div className="l-footer-top"><span>HAVE SOMETHING IN MIND?</span><span>FRONTEND ENGINEER / INDIA</span></div>
   <a className="l-footer-title" href={'mailto:'+person.email}>LET&apos;S TALK <span>↗</span></a>
   <div className="l-footer-bottom">
    <div><strong>ARCHIT JAIN</strong><p>Building digital experiences<br/>that make complexity feel simple.</p></div>
    <nav aria-label="Footer links"><a href={person.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={person.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={person.x} target="_blank" rel="noreferrer">X ↗</a><a href={person.instagram} target="_blank" rel="noreferrer">Instagram ↗</a></nav>
    <div className="l-footer-end"><a href={person.resume} target="_blank" rel="noreferrer">Résumé ↗</a><span>© {new Date().getFullYear()} ARCHIT JAIN</span></div>
   </div>
  </div>
 </footer>;
}
