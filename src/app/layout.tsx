import type {Metadata,Viewport} from 'next';
import './globals.css';
import './gravity-reimagined.css';
import './site-loader.css';
import './site-effects.css';
import {SiteEnhancements} from '@/components/SiteEnhancements';
import {Syne,Plus_Jakarta_Sans,IBM_Plex_Mono} from 'next/font/google';
const displayFont=Syne({subsets:['latin'],variable:'--font-syne',display:'swap',preload:true});
const bodyFont=Plus_Jakarta_Sans({subsets:['latin'],variable:'--font-jakarta',display:'swap',preload:true});
const monoFont=IBM_Plex_Mono({subsets:['latin'],weight:['500','600','700'],variable:'--font-ibm',display:'swap',preload:false});
import {SiteLoader} from '@/components/SiteLoader';
export const metadata:Metadata={
  metadataBase:new URL('https://hiarchit-artful-karan-ranas-projects-87a15f72.vercel.app'),
  title:{default:'Archit Jain — Frontend Engineer',template:'%s — Archit Jain'},
  description:'Archit Jain is a frontend engineer building high-performance Angular and React applications. Explore his work on UMANG, ITPO Booking, AI translation and developer tooling.',
  openGraph:{title:'Archit Jain — The Human Interface',description:'Engineering complex systems into human experiences.',type:'website'},
  robots:{index:false,follow:false},
  other:{'theme-color':'#101214'},
};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#101214'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en" className={[displayFont.variable,bodyFont.variable,monoFont.variable].join(' ')}><body><SiteLoader/><SiteEnhancements/>{children}</body></html>}
