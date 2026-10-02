import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageMotion } from '@/components/page-motion';
import { PeopleGrid } from '@/components/people-grid';
import { Button } from '@/components/ui/button';
import people from '@/lib/people.json';

export const metadata: Metadata = {
  title: 'Our Team',
  description:
    'Meet the people behind THREE. Explore the leadership team’s experience, ideas, and shared purpose.',
};
export default function TeamPage() {
  return (
    <PageMotion>
      <section className="people-hero section-pad">
        <div data-reveal>
          <p className="eyebrow">OUR TEAM</p>
          <h1>
            Good People.
            <br />
            Shared Possibility.
          </h1>
          <p>
            Different experiences. One belief in what people can become. Meet the team moving THREE
            forward.
          </p>
          <a href="#leadership" className="text-link">
            Meet Our Leadership <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="people-hero-portraits" aria-hidden="true">
          <img src={people.team[0].image} alt="" width={400} height={600} data-parallax />
          <img src={people.team[1].image} alt="" width={400} height={600} />
          <img src={people.team[3].image} alt="" width={400} height={600} data-parallax />
        </div>
      </section>
      <section className="people-section section-pad" id="leadership">
        <div className="section-heading" data-reveal>
          <h2>The People Behind THREE.</h2>
          <p>Get to know their stories.</p>
        </div>
        <PeopleGrid people={people.team} />
      </section>
      <section className="closing-section">
        <div>
          <p className="eyebrow">CURIOSITY CONNECTS US</p>
          <h2>
            Meet The Minds
            <br />
            Behind The Science.
          </h2>
        </div>
        <Button variant="light" asChild>
          <Link href="/scientific-advisory-board">
            Our Scientific Advisory Board <ArrowUpRight size={18} />
          </Link>
        </Button>
      </section>
    </PageMotion>
  );
}
