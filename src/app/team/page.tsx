import type { Metadata } from 'next';
import Team from '@/components/Team';
import { site } from '@/lib/site';

export const metadata: Metadata = {
    title: 'Team',
    description: 'Table d’Adrian team — craft, technique, and service shaped by the Riviera.',
    alternates: { canonical: `${site.url}/team` },
};

export default function TeamPage() { return <Team />; }

