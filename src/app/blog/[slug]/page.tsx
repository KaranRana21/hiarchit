import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Chrome } from "@/components/Chrome";
import { notes } from "@/lib/notes";
export function generateStaticParams(){return notes.map(n=>({slug:n.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const note=notes.find(n=>n.slug===slug);return {title:note?.title||"Field Note",description:note?.summary};}
export default async function Note({params}:{params:Promise<{slug:string}>}) {const {slug}=await params;const note=notes.find(n=>n.slug===slug);if(!note)notFound();return <main><Chrome/><article className="article-page"><span>FIELD NOTE / {note.category}</span><h1>{note.title}</h1>{note.body.map(p=><p key={p}>{p}</p>)}<p style={{marginTop:70}}><Link href="/blog">← ALL NOTES</Link></p></article></main>}
