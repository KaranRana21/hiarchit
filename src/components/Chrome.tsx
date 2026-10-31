'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect,useState} from 'react';
import {person} from '@/lib/content';

export function Header(){
 const pathname=usePathname();const[open,setOpen]=useState(false);const[scrolled,setScrolled]=useState(false);
 useEffect(()=>{const fn=()=>setScrolled(scrollY>32);window.addEventListener('scroll',fn,{passive:true});fn();return()=>window.removeEventListener('scroll',fn)},[]);
 useEffect(()=>{if(!open)return;const fn=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false)};window.addEventListener('keydown',fn);return()=>window.removeEventListener('keydown',fn)},[open]);
 const nav=[{name:'Index',url:'/'},{name:'Work',url:'/work'},{name:'Journal',url:'/journal'},{name:'About',url:'/#about'}];
 return <header className={'site-header '+(scrolled?'is-scrolled':'')}>
  <div className="frame header-frame"><Link href="/" className="identity" aria-label="Archit Jain, home"><span className="identity-mark">a<span>•</span></span><span className="identity-copy">ARCHIT<br/>JAIN</span></Link>
   <span className="header-position micro-label"><span className="status-pulse"/> FRONTEND ENGINEER <span className="header-sep">/</span> INDIA</span>
   <nav className={'header-nav '+(open?'menu-open':'')} aria-label="Primary navigation">{nav.map(n=><Link key={n.name} href={n.url} onClick={()=>setOpen(false)} className={pathname===n.url?'selected':''}>{n.name}</Link>)}</nav>
   <a className="header-cta" href={'mailto:'+person.email}>CONTACT <span>↗</span></a>
   <button type="button" className="menu-toggle" onClick={()=>setOpen(s=>!s)} aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open}><span/><span/></button>
  </div>
 </header>
}
export function Footer(){return <footer className="footer"><div className="frame footer-main"><span className="micro-label">© {new Date().getFullYear()} ARCHIT JAIN — ALL SYSTEMS HUMAN</span><div className="footer-socials"><a target="_blank" rel="noopener noreferrer" href={person.github}>GITHUB ↗</a><a target="_blank" rel="noopener noreferrer" href={person.linkedin}>LINKEDIN ↗</a><a target="_blank" rel="noopener noreferrer" href={person.x}>X ↗</a><a target="_blank" rel="noopener noreferrer" href={person.instagram}>INSTAGRAM ↗</a></div><Link href="/">BACK TO TOP ↑</Link></div></footer>}
