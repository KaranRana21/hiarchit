export const person = {
  name: 'Archit Jain', first: 'ARCHIT', last: 'JAIN', role: 'Frontend Engineer',
  email: 'architjain808@gmail.com',
  github: 'https://github.com/architjain808',
  linkedin: 'https://www.linkedin.com/in/archit-jain-337a66195/',
  x: 'https://x.com/ArchitJ808',
  instagram: 'https://www.instagram.com/_archit.jain_',
  resume: 'https://drive.google.com/file/d/1EB7sm0s2JdGwiux5YC6yiQYeTxyi5wTN/view?usp=sharing',
  portrait: '/archit-portrait.svg',
  bio: 'I build high-performance, scalable frontend applications — from public-service platforms to real-time tools. I work where thoughtful product design meets robust engineering.',
  education: { degree:'B.Tech — Computer Science', university:'Kurukshetra University', period:'2018 — 2022' },
  job: { role:'Associate IT (SDE 2)', company:'Daffodils Software', since:'January 2022 — Present', url:'https://www.daffodilsw.com/' }
};
export type Project = {id:string;slug:string;name:string;type:string;year:string;role:string;tags:string[];lead:string;description:string;impact:string;url:string;art:'civic'|'architecture'|'language'|'ai';tone:string};
export const projects:Project[] = [
  {id:'01',slug:'umang-web',name:'UMANG Web',type:'National digital services',year:'2024',role:'Frontend Engineer',tags:['Angular','RxJS','Enterprise UI'],lead:'One interface. Millions of possibilities.',description:'Core web platform for UMANG, unifying pan-India e-Governance services in an accessible, scalable frontend.',impact:'Government-scale public services',url:'https://web.umang.gov.in/',art:'civic',tone:'#c0d9f5'},
  {id:'02',slug:'itpo-booking',name:'ITPO Booking',type:'Exhibition booking infrastructure',year:'2024',role:'Lead Frontend Developer',tags:['Angular','Booking System','Gov Tech'],lead:'Turning complex bookings into clear journeys.',description:'Booking experience for India Trade Promotion Organisation / Bharat Mandapam, built to simplify exhibition and event bookings.',impact:'10,000+ bookings processed',url:'https://booking.indiatradefair.com/',art:'architecture',tone:'#e5b890'},
  {id:'03',slug:'anuvachan',name:'Anuvachan',type:'AI ancient-text translator',year:'2023',role:'Full Stack Developer',tags:['Angular','TypeScript','AI'],lead:'Making old knowledge accessible in new ways.',description:'Application for transcription and translation of ancient Sanskrit and Hindi texts, reducing manual transcription effort.',impact:'98% reduction in manual effort',url:'https://github.com/architjain808/Anuvachan',art:'language',tone:'#d0b9f4'},
  {id:'04',slug:'talenttrace',name:'TalentTrace',type:'AI recruitment software',year:'2023',role:'Product Engineer',tags:['Next.js','AI/ML','SaaS'],lead:'Better signals for better hiring.',description:'AI-driven recruitment concept with intelligent candidate matching and automated screening workflows.',impact:'Intelligent candidate matching',url:'https://github.com/architjain808/TalentTrace',art:'ai',tone:'#badcbf'},
];
export const outcomes=[
  {value:'150+',label:'Reusable Angular components',desc:'Engineered across frontend delivery'},
  {value:'46%',label:'Faster development',desc:'Attributed to reusable UI systems'},
  {value:'30%',label:'Less code duplication',desc:'Across a 15-member team'},
  {value:'15+',label:'Languages supported',desc:'In AI-driven translation work'},
];
export const competencies=[
  {n:'01',title:'Frontend systems',subtitle:'The architecture beneath the interface.',desc:'Component systems, predictable state, performance, accessibility and long-term maintainability.',items:['Angular','React','TypeScript','JavaScript','RxJS','Redux Toolkit']},
  {n:'02',title:'Product craft',subtitle:'The details people remember.',desc:'Design systems, Figma-to-frontend execution, purposeful interaction and responsive composition.',items:['UI / UX','Figma','GSAP','HTML / CSS','Material UI']},
  {n:'03',title:'Emerging tools',subtitle:'Working with what comes next.',desc:'AI-enabled experiences, real-time tools and pragmatic integration of modern web infrastructure.',items:['Next.js','React Query','AI integration','Real-time tools','API integration']}
];
export const achievements=[
  'Directed a team of five developers; reported 30% faster project delivery.',
  'Helped reduce UI duplication 30% across a 15-member engineering team.',
  'Built an AI-powered translation tool reporting 40% cost reduction across 15+ languages.',
  'Developed 150+ reusable Angular components and accessible interface patterns.'
];
export type Article = {slug:string;date:string;mins:string;title:string;summary:string;tags:string[]};
export const articles:Article[]=[
  {slug:'ai-testing-tools-future-2026',date:'28 MAR 2026',mins:'9 MIN',title:'AI Testing Tools Are Rewriting the QA Playbook: Jules, PlayerZero, and What’s Next',summary:'Real-world uses for the latest AI-assisted testing tools — and what changes for quality engineering.',tags:['AI Tools','Testing']},
  {slug:'claude-implement-design-figma',date:'23 MAR 2026',mins:'8 MIN',title:'Claude’s Built-In “Implement Design” Skill: Turn Any Figma Link Into Code',summary:'Using Claude Code and Figma MCP to turn designs into working component implementations.',tags:['Claude Code','Figma']},
  {slug:'building-modern-angular-apps',date:'21 MAR 2026',mins:'6 MIN',title:'Building Modern Angular 19 Applications',summary:'Standalone components, SSR, prerendering and animation in modern Angular projects.',tags:['Angular','Engineering']},
  {slug:'claude-code-latest-update',date:'21 MAR 2026',mins:'7 MIN',title:'Claude Code Just Changed How I Build Software — Here’s the Proof',summary:'Sub-agents, hooks, MCP and the developer workflow changes Archit has been testing.',tags:['AI Tools','Workflow']},
  {slug:'professional-ui-ux-for-developers',date:'21 MAR 2026',mins:'9 MIN',title:'Your App Works. Now Make It Look Professional.',summary:'UI/UX fundamentals and tools for elevating working applications into polished products.',tags:['Design','Frontend']},
  {slug:'claude-memory-feature',date:'21 MAR 2026',mins:'7 MIN',title:'10 Things You Can Do With Claude’s New Memory Feature',summary:'Practical applications of persistent memory for development work and productivity.',tags:['AI Tools','Productivity']},
];
export const originalArticleUrl=(slug:string)=>`https://hiarchit.online/blog/${encodeURIComponent(slug)}`;
