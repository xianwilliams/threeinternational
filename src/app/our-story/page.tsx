import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageMotion } from '@/components/page-motion';
import { AmbientFilm } from '@/components/ambient-film';
import { FilmDialog } from '@/components/film-dialog';

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'People. Platform. Purpose. Get to know THREE and the belief that every day holds more possibility.',
};
export default function StoryPage() {
  return (
    <PageMotion className="story-page">
      <section className="cinematic-hero story-cinema light-cinema">
        <AmbientFilm
          src="/video/story-hero.mp4"
          poster="/images/story-hero-poster.jpg"
          alt="THREE wellness products in warm natural morning light"
        />
        <div className="cinematic-copy" data-reveal>
          <p className="eyebrow">THIS IS THREE</p>
          <h1>
            Life, With
            <br />
            More Possibility.
          </h1>
          <p>
            More health. More wellness. More hope.
            <br />A belief in what we can become, together.
          </p>
          <Button asChild>
            <a href="#our-purpose">
              Meet THREE <ArrowRight size={17} />
            </a>
          </Button>
        </div>
        <span className="hero-side-note">PEOPLE. PLATFORM. PURPOSE.</span>
      </section>
      <section className="story-formation section-pad" id="our-purpose">
        <div
          className="ingredient-composition"
          role="img"
          aria-label="Botanical ingredients gather around an Éternel product as you scroll"
        >
          <div className="formation-ring" />
          <div className="formation-ring inner" />
          <div className="ingredient-orbit">
            <div className="ingredient-fragment botanical-fruit fruit-one" />
            <div className="ingredient-fragment botanical-fruit fruit-two" />
            <div className="ingredient-fragment botanical-berry berry-one" />
            <div className="ingredient-fragment botanical-berry berry-two" />
            <div className="ingredient-fragment botanical-berry berry-three" />
            <div className="ingredient-fragment nutrient-drop drop-one" />
            <div className="ingredient-fragment nutrient-drop drop-two" />
          </div>
          <svg className="formed-product" viewBox="700 400 320 540" aria-hidden="true">
            <defs>
              <clipPath id="eternel-pouch">
                <path d="M826 427 Q826 425 834 425 H923 Q931 425 931 434 V488 L920 500 L933 510 L926 521 L930 532 L997 582 V927 H767 L757 581 L831 525 L830 513 L826 509 L833 497 L826 490 Z" />
              </clipPath>
            </defs>
            <image
              href="/images/eternel-0.png"
              width="1080"
              height="1080"
              clipPath="url(#eternel-pouch)"
            />
          </svg>
          <span className="formation-label">NATURE. THOUGHTFULLY BROUGHT TOGETHER.</span>
        </div>
        <div className="editorial-copy" data-reveal>
          <p className="eyebrow">A MORE CONSIDERED EVERYDAY</p>
          <h2>
            Small Choices.
            <br />A Life That Is Yours.
          </h2>
          <p>
            A daily routine can be a simple way to care for yourself. THREE brings together
            nutritional supplements and skincare, with a focus on carefully selected ingredients and
            how they are delivered.
          </p>
          <p>
            Our purpose is to empower your potential. To create more health, more wellness, and more
            hope, so you can make room for the life you want to live.
          </p>
          <Button asChild>
            <Link href="/shop">
              Find Your THREE <ArrowUpRight size={18} />
            </Link>
          </Button>
        </div>
      </section>
      <section className="purpose-panorama">
        <img
          src="/images/editorial/story-purpose.webp"
          alt="A mother and daughter sharing a quiet moment"
          width={1600}
          height={1000}
          loading="lazy"
          data-parallax
        />
        <div className="purpose-glass" data-reveal>
          <p className="eyebrow">GOOD SCIENCE. HUMAN PURPOSE.</p>
          <h2>
            Everything Begins
            <br />
            With People.
          </h2>
          <p>
            Better health opens up possibilities. THREE pairs a passion for people with a platform
            for entrepreneurship and a purpose that reaches beyond ourselves.
          </p>
          <FilmDialog
            title="The THREE Story"
            src="https://iframe.dacast.com/vod/fb29f240-220f-534a-2071-5cd65835a577/c8efa425-62d8-4be6-902f-1842f8176cf1"
          />
        </div>
      </section>
      <section className="purpose-pillars section-pad">
        {[
          [
            'People',
            'Wellness Starts With You.',
            'We exist to help people reach their potential through health, wellness, and a community that believes in what comes next.',
          ],
          [
            'Platform',
            'Possibility, Shared.',
            'Our ambassador platform gives people a way to share the products they love, build connections, and pursue their own business.',
          ],
          [
            'Purpose',
            'Good That Goes Further.',
            'Through Love THREE, our community brings service and generosity to children and youth who need to feel safe, seen, and supported.',
          ],
        ].map(([label, title, text]) => (
          <article key={label} data-reveal>
            <span>{label}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>
      <section className="flow-row story-science">
        <div className="flow-image">
          <img
            src="/images/the-science-exploration.webp"
            alt="Powder and capsules in a stone mortar"
            width={900}
            height={800}
            loading="lazy"
            data-parallax
          />
        </div>
        <div className="editorial-copy" data-reveal>
          <h2>
            It Starts With
            <br />A Closer Look.
          </h2>
          <p>
            Exploration. Curation. Absorption. Three principles guide our approach, from the natural
            ingredients we study to the formulas we create. Quality, efficacy, and safety shape
            every step.
          </p>
          <Link href="/science" className="text-link">
            Meet The Science <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="story-connections section-pad">
        <div data-reveal>
          <p className="eyebrow">GET TO KNOW US</p>
          <h2>
            There’s More
            <br />
            To THREE.
          </h2>
        </div>
        <div>
          {[
            ['Our Team', 'Meet the people behind the brand.', '/our-team'],
            ['Love THREE', 'Small acts. Lasting possibility.', '/love-three'],
            ['Become An Ambassador', 'Share what makes you feel good.', '/opportunity'],
          ].map(([title, text, href]) => (
            <Link href={href} key={href} data-reveal>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
              <ArrowUpRight size={21} />
            </Link>
          ))}
        </div>
      </section>
    </PageMotion>
  );
}
