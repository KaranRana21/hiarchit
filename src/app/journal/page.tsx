import type {Metadata} from 'next';
import {JournalPage} from '@/components/JournalPage';
export const metadata:Metadata={title:'Journal',description:'Archit Jain writes about Angular, frontend engineering, developer workflows and AI tooling.'};
export default function Page(){return <JournalPage/>}
