import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageMotion } from '@/components/page-motion';
import { JournalBrowser } from '@/components/journal-browser';
import { journalSummaries } from '@/lib/journal';

export const metadata: Metadata = {
  title: 'The Journal',
  description:
    'Explore THREE’s stories on nutrition, skincare, everyday wellness, and the science behind our formulas.',
};
export default function JournalPage() {
  const featured = journalSummaries.find(
    (article) => article.slug === 'glp-three-a-natural-approach-to-glp-1-support',
  )!;
  return (
    <PageMotion className="journal-page">
      <section className="journal-masthead section-pad">
        <div data-reveal>
          <p className="eyebrow">IDEAS FOR YOUR EVERYDAY</p>
          <h1>The Journal.</h1>
        </div>
        <p data-reveal>
          Look a little closer.
          <br />
          Feel a little more informed.
        </p>
      </section>
      <section className="journal-feature">
        <Link href={`/journal/${featured.slug}`}>
          <div className="journal-feature-image">
            <img
              src={featured.image}
              alt="GLP THREE bottle and its natural botanical ingredients"
              width={1600}
              height={1000}
              fetchPriority="high"
              data-parallax
            />
          </div>
          <div className="journal-feature-copy" data-reveal>
            <p className="eyebrow">IN FOCUS · GLP THREE</p>
            <h2>
              A Natural Approach
              <br />
              To GLP-1 Support.
            </h2>
            <p>{featured.description}</p>
            <span className="text-link">
              Read The Story <ArrowUpRight size={18} />
            </span>
          </div>
        </Link>
      </section>
      <JournalBrowser articles={journalSummaries} />
      <section className="closing-section">
        <h2>
          Make Room For
          <br />
          Your Everyday Good.
        </h2>
        <Link href="/shop" className="button button-light">
          Explore The Collection <ArrowUpRight size={18} />
        </Link>
      </section>
    </PageMotion>
  );
}
