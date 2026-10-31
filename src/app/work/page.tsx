import type {Metadata} from 'next';
import {WorkPage} from '@/components/WorkPage';

export const metadata:Metadata={
  title:'Selected Work',
  description:'Explore Archit Jain\'s frontend engineering projects: UMANG, ITPO Booking, Anuvachan, and TalentTrace.'
};

export default function Page(){return <WorkPage/>}
