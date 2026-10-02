import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { PageMotion } from '@/components/page-motion';
import { FilmDialog } from '@/components/film-dialog';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'THREE Farm',
  description:
    'Explore THREE Farm in Thailand, an agricultural reserve dedicated to medicinal plants, phytonutrients, and discovery.',
};
export default function FarmPage() {
  return (
    <PageMotion className="farm-page">
      <section className="cinematic-hero farm-cinema">
        <div className="ambient-media" data-parallax>
          <img
            src="/images/editorial/farm-hero.webp"
            alt="THREE Farm’s lush agricultural reserve in Thailand"
            width={1600}
            height={900}
            fetchPriority="high"
          />
        </div>
        <div className="cinematic-copy" data-reveal>
          <p className="eyebrow">THREE FARM · THAILAND</p>
          <h1>
            Our Curiosity
            <br />
            Has Roots.
          </h1>
          <p>
            A living place for cultivation,
            <br />
            exploration, and botanical possibility.
          </p>
          <Button variant="light" asChild>
            <a href="#farm-research">
              Explore The Farm <ArrowRight size={17} />
            </a>
          </Button>
        </div>
      </section>
      <section className="farm-intro section-pad" data-reveal>
        <h2>
          Where Nature
          <br />
          Opens New Doors.
        </h2>
        <div>
          <p>
            An agricultural reserve dedicated to the cultivation, exploration, and innovation of
            medicinal plants. THREE Farm gives our scientists a place to ask better questions about
            the natural world.
          </p>
          <FilmDialog
            title="A Closer Look At THREE Farm"
            src="https://player.vimeo.com/video/827438740?h=d71ea14732"
          />
        </div>
      </section>
      <section className="farm-stories" id="farm-research">
        {[
          [
            'farm-research',
            'Room To Discover.',
            'Our research explores how growing methods influence the phytonutrients and bioavailability of health-promoting molecules in medicinal plants. The aim is to develop new products and improve existing THREE formulas.',
            'THREE intends to make the findings public, so this work can contribute to a wider understanding of plants, health, and quality of life.',
          ],
          [
            'farm-thailand',
            'Why Thailand?',
            'The right environment matters. Our team selected this secluded region for its fertile land, growing conditions, and soil that had remained uncompromised and organic for three decades.',
            'It is a place to study how thoughtful cultivation can support the phytonutrient content of medicinal plants.',
          ],
          [
            'farm-benefits',
            'From Discovery To Your Day.',
            'Research at THREE Farm supports the brand’s pursuit of distinctive nutrients and science-backed, quality-tested formulas.',
            'Whether you are choosing a product for yourself or sharing it with someone else, understanding where the thinking begins makes the choice more meaningful.',
          ],
        ].map(([image, title, text, more]) => (
          <article className="flow-row" key={image}>
            <div className="flow-image">
              <img
                src={`/images/editorial/${image}.webp`}
                alt={
                  title === 'Why Thailand?'
                    ? 'The growing environment at THREE Farm in Thailand'
                    : 'Botanical research and cultivation at THREE Farm'
                }
                width={900}
                height={750}
                loading="lazy"
                data-parallax
              />
            </div>
            <div className="editorial-copy" data-reveal>
              <h2>{title}</h2>
              <p>{text}</p>
              <p>{more}</p>
            </div>
          </article>
        ))}
      </section>
      <section className="closing-section">
        <div>
          <h2>
            Curiosity, Brought
            <br />
            To Everyday Life.
          </h2>
        </div>
        <Button variant="light" asChild>
          <Link href="/shop">
            Explore The Collection <ArrowUpRight size={18} />
          </Link>
        </Button>
      </section>
    </PageMotion>
  );
}
