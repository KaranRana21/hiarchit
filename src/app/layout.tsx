import type {Metadata,Viewport} from 'next';
import './globals.css';
import './gravity-reimagined.css';
import './site-loader.css';
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
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body><SiteLoader/>{children}</body></html>}
