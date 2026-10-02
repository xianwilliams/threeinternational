import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageMotion } from '@/components/page-motion';
import { PeopleGrid } from '@/components/people-grid';
import { Button } from '@/components/ui/button';
import people from '@/lib/people.json';

export const metadata: Metadata = {
  title: 'Scientific Advisory Board',
  description:
    'Meet THREE’s scientific advisory board. Experts in nutritional science, medicine, and holistic wellness.',
};
export default function BoardPage() {
  return (
    <PageMotion>
      <section className="board-hero section-pad">
        <div data-reveal>
          <p className="eyebrow">SCIENTIFIC ADVISORY BOARD</p>
          <h1>
            Many Disciplines.
            <br />A Deeper Perspective.
          </h1>
          <p>
            Science grows through collaboration. Our advisory board brings together experts in
            medicine, nutrition, and wellness to help shape product development and holistic health
            education.
          </p>
          <a href="#scientists" className="text-link">
            Meet The Board <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="board-hero-image">
          <img
            src="/images/the-science-curation.webp"
            alt="THREE’s approach to scientific formulation"
            width={1000}
            height={900}
            data-parallax
          />
          <span>EXPLORATION · CURATION · ABSORPTION</span>
        </div>
      </section>
      <section id="scientists" className="people-section section-pad">
        <div className="section-heading" data-reveal>
          <h2>Expertise With A Shared Purpose.</h2>
          <p>Meet our scientific community.</p>
        </div>
        <PeopleGrid people={people.board} />
      </section>
      <section className="closing-section">
        <div>
          <h2>
            A World Worth
            <br />
            Looking Closer At.
          </h2>
        </div>
        <Button variant="light" asChild>
          <Link href="/three-farm">
            Explore THREE Farm <ArrowUpRight size={18} />
          </Link>
        </Button>
      </section>
    </PageMotion>
  );
}
