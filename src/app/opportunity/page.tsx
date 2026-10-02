import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, Check } from 'lucide-react';
import { PageMotion } from '@/components/page-motion';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Become An Ambassador',
  description:
    'Explore two ways to share THREE: introduce products you love or build a team in the THREE community.',
};
export default function OpportunityPage() {
  return (
    <PageMotion className="opportunity-page">
      <section className="cinematic-hero opportunity-cinema">
        <div className="ambient-media" data-parallax>
          <img
            src="/images/editorial/opportunity-hero.webp"
            alt="An expressive black-and-white portrait in the wind"
            width={1600}
            height={900}
            fetchPriority="high"
          />
        </div>
        <div className="cinematic-copy" data-reveal>
          <p className="eyebrow">THE THREE COMMUNITY</p>
          <h1>
            Something Good
            <br />
            Is Worth Sharing.
          </h1>
          <p>
            Products you believe in.
            <br />
            People who see the possibilities.
          </p>
          <Button variant="light" asChild>
            <a href="#ways-to-share">
              Find Your Way <ArrowRight size={17} />
            </a>
          </Button>
        </div>
      </section>
      <section className="opportunity-intro section-pad" data-reveal>
        <h2>
          Two Ways
          <br />
          To Share THREE.
        </h2>
        <p>
          THREE brings together advanced nutrition and a community of Brand Ambassadors. Explore
          opportunities to earn commissions and rewards by sharing the products you love.
        </p>
      </section>
      <section className="opportunity-paths section-pad" id="ways-to-share">
        {[
          {
            title: 'Share The Products.',
            intro: 'Start with what you love. Make it personal.',
            benefits: [
              'Commissions on orders placed by your customers',
              'Your own THREE business website',
              'A Back Office to track your earnings',
              'A library of social media tools',
            ],
          },
          {
            title: 'Build A Team.',
            intro: 'Bring people together around a shared possibility.',
            benefits: [
              'Weekly team commissions',
              'Travel rewards',
              'First-order commissions',
              'Rank advancement bonuses',
            ],
          },
        ].map(({ title, intro, benefits }) => (
          <article key={title} data-reveal>
            <h3>{title}</h3>
            <p>{intro}</p>
            <ul>
              {benefits.map((item) => (
                <li key={item}>
                  <Check size={17} />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
        <p className="opportunity-note">
          Commissions and rewards are subject to THREE’s current program terms and eligibility
          requirements. Results vary; income is not guaranteed.
        </p>
      </section>
      <section className="opportunity-close">
        <img
          src="/images/editorial/opportunity-community.webp"
          alt="Golden supplement softgels in glass dishes"
          width={1600}
          height={800}
          loading="lazy"
          data-parallax
        />
        <div data-reveal>
          <h2>
            Your Next Chapter
            <br />
            Could Start Here.
          </h2>
          <p>Connect with THREE to learn about the current ambassador program.</p>
          <Button variant="light" asChild>
            <a href="mailto:support@iii.earth?subject=THREE%20Ambassador%20Program">
              Talk To THREE <ArrowUpRight size={18} />
            </a>
          </Button>
          <Link className="text-link" href="/our-team">
            Meet Our Team <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </PageMotion>
  );
}
