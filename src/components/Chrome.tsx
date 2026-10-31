'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect,useState} from 'react';
import {person} from '@/lib/content';

export function Header(){
 const pathname=usePathname();const [open,setOpen]=useState(false);const [scrolled,setScrolled]=useState(false);

 useEffect(()=>{const cb=()=>setScrolled(window.scrollY>28);cb();window.addEventListener('scroll',cb,{passive:true});return()=>window.removeEventListener('scroll',cb)},[]);
 useEffect(()=>{if(!open)return;const esc=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false)};window.addEventListener('keydown',esc);return()=>window.removeEventListener('keydown',esc)},[open]);
 return <header className={'header '+(scrolled?'header-scrolled':'')}><div className="header-inner shell">
 <Link className="brand" href="/" aria-label="Archit Jain home"><span className="brand-symbol">a<span className="brand-period">.</span></span><span className="brand-name">ARCHIT<br/>JAIN</span></Link>
 <div className="nav-center"><span className="nav-status-dot"/>FRONTEND ENGINEER <span className="slash">/</span> INDIA</div>
 <nav className={'nav-links '+(open?'nav-open':'')} aria-label="Primary navigation"><Link className={pathname==='/'?'current':''} href="/" onClick={()=>setOpen(false)}>Index</Link><Link className={pathname.startsWith('/work')?'current':''} href="/work" onClick={()=>setOpen(false)}>Work</Link><Link className={pathname.startsWith('/journal')?'current':''} href="/journal" onClick={()=>setOpen(false)}>Journal</Link><Link href="/#about" onClick={()=>setOpen(false)}>About</Link></nav>
 <a className="nav-contact" href={'mailto:'+person.email+'?subject=Let%27s%20build%20something'}>LET&apos;S TALK <span>↗</span></a>
 <button type="button" className="menu-toggle" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} onClick={()=>setOpen(!open)}><span/><span/></button>
 </div></header>
}
export function Footer(){return <footer className="footer"><div className="shell footer-top"><div className="footer-brand">ARCHIT <span>JAIN.</span></div><div className="footer-lines"><a href={'mailto:'+person.email}>{person.email} ↗</a><div><a href={person.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={person.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={person.x} target="_blank" rel="noreferrer">X ↗</a><a href={person.instagram} target="_blank" rel="noreferrer">Instagram ↗</a></div></div></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} ARCHIT JAIN</span><span>BUILT FOR PEOPLE. ENGINEERED FOR SCALE.</span><Link href="/">BACK TO TOP ↑</Link></div></footer>}
