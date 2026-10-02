import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Faq } from '@/components/faq';
import { PageMotion } from '@/components/page-motion';
import { AmbientFilm } from '@/components/ambient-film';

export const metadata: Metadata = {
  title: 'The Science Of Everyday Wellness',
  description:
    'Explore THREE’s approach to exploration, curation, and cellular absorption. Understand the thinking behind each formula.',
};
const principles = [
  {
    title: 'A world worth exploring.',
    label: 'EXPLORATION',
    text: 'THREE’s scientists study the natural world to identify distinctive phytonutrients. Their work begins with curiosity about plants, their compounds, and the role those compounds can play in nutrition.',
    image: 'the-science-exploration.webp',
    alt: 'Powder and capsules in a stone mortar',
    href: '/three-farm',
    link: 'Explore THREE Farm',
  },
  {
    title: 'Thoughtfully brought together.',
    label: 'CURATION',
    text: 'A formula is more than a list of ingredients. THREE brings together specialists in science and nutrition to select, combine, test, and refine each formulation.',
    image: 'the-science-curation.webp',
    alt: 'THREE formulation and ingredient curation',
    href: '/scientific-advisory-board',
    link: 'Meet The Scientific Minds',
  },
  {
    title: 'The next step is absorption.',
    label: 'ABSORPTION',
    text: 'THREE’s cellular absorption approach considers how nutrients are delivered and used by the body. Explore the brand’s research and product information to understand the technology behind each specific formula.',
    image: 'the-science-absorption.webp',
    alt: 'A close portrait from THREE’s cellular wellness story',
    href: '/journal/the-science-of-cellular-absorption-why-glp-three-is-different',
    link: 'A Closer Look At Absorption',
  },
];
export default function SciencePage() {
  return (
    <PageMotion className="science-page">
      <section className="cinematic-hero science-cinema">
        <AmbientFilm
          src="/video/science-hero.mp4"
          poster="/images/science-hero-poster.jpg"
          alt="Sunlit woodland, botanical leaves, and a clear forest stream"
        />
        <div className="cinematic-copy" data-reveal>
          <p className="eyebrow">THE SCIENCE OF THREE</p>
          <h1>
            Nature Has
            <br />
            More To Tell Us.
          </h1>
          <p>
            We look closer. Explore further.
            <br />
            And think about what your body can actually use.
          </p>
          <Button variant="light" asChild>
            <a href="#principles">
              Take A Closer Look <ArrowRight size={17} />
            </a>
          </Button>
        </div>
        <span className="hero-side-note">EXPLORATION. CURATION. ABSORPTION.</span>
      </section>
      <section className="science-intro section-pad" data-reveal>
        <p className="eyebrow">THREE PRINCIPLES. ONE PURPOSE.</p>
        <h2>
          Make everyday nutrition
          <br />a little more thoughtful.
        </h2>
        <p>
          From discovering ingredients to refining a formula, THREE approaches wellness through
          three connected ideas. Here is a closer look.
        </p>
      </section>
      <section id="principles" className="science-principles flowing-science">
        {principles.map((principle) => (
          <article key={principle.label}>
            <div className="principle-picture">
              <img
                src={`/images/${principle.image}`}
                alt={principle.alt}
                width={800}
                height={700}
                loading="lazy"
                data-parallax
              />
            </div>
            <div className="principle-copy" data-reveal>
              <p className="eyebrow">{principle.label}</p>
              <h2>{principle.title}</h2>
              <p>{principle.text}</p>
              <Link href={principle.href} className="text-link">
                {principle.link} <ArrowUpRight size={17} />
              </Link>
            </div>
          </article>
        ))}
      </section>
      <section className="expert-section section-pad" data-reveal>
        <div>
          <p className="eyebrow">MINDS BEHIND THE FORMULAS</p>
          <h2>Expertise with a shared purpose.</h2>
        </div>
        <div>
          <p>
            THREE’s Scientific Advisory Board brings together experts in wellness and nutritional
            medicine. Their work informs product development and holistic health education.
          </p>
          <Link className="text-link" href="/scientific-advisory-board">
            Meet The Scientific Community <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="faq-section section-pad">
        <div>
          <p className="eyebrow">AN INFORMED APPROACH</p>
          <h2>Know what you’re choosing.</h2>
        </div>
        <Faq
          items={[
            {
              question: 'Where can I find product-specific information?',
              answer:
                'Every product page includes its selected ingredients, stated benefits, and a link to the full product details on THREE’s official store. For GLP THREE, you can also open the published product fact sheet.',
            },
            {
              question: 'Are supplements a substitute for medical care?',
              answer:
                'No. Dietary supplements are not intended to diagnose, treat, cure, or prevent disease. Talk to your healthcare professional before starting a supplement, especially if you take medication or have a medical condition.',
            },
          ]}
        />
      </section>
      <section className="closing-section">
        <div>
          <p className="eyebrow">PUT THOUGHT INTO YOUR ROUTINE</p>
          <h2>Find your everyday good.</h2>
        </div>
        <Button variant="light" asChild>
          <Link href="/shop">
            Explore the collection <ArrowUpRight size={18} />
          </Link>
        </Button>
      </section>
    </PageMotion>
  );
}
