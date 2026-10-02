import type { Metadata } from 'next';
import { ArrowRight, ArrowUpRight, Heart, HandHeart, UsersRound } from 'lucide-react';
import { PageMotion } from '@/components/page-motion';
import { Button } from '@/components/ui/button';
import { DonationSelector, ShareLove } from '@/components/donation-selector';

export const metadata: Metadata = {
  title: 'Love THREE',
  description:
    'Join Love THREE in creating change through service and generosity. Help children and youth feel safe, seen, and supported.',
};
export default function LoveThreePage() {
  return (
    <PageMotion className="love-page">
      <section className="cinematic-hero love-cinema light-cinema">
        <div className="ambient-media" data-parallax>
          <img
            src="/images/editorial/love-hands.webp"
            alt="Hands coming together in the shape of a heart"
            width={1600}
            height={900}
            fetchPriority="high"
          />
        </div>
        <div className="cinematic-copy" data-reveal>
          <p className="eyebrow">LOVE THREE</p>
          <h1>
            Sign Off On
            <br />
            Something Good.
          </h1>
          <p>
            Join us in creating change through service
            <br className="desktop-break" /> and generosity, wherever we are.
          </p>
          <Button asChild>
            <a href="#give">
              Give A Little Love <ArrowRight size={17} />
            </a>
          </Button>
        </div>
        <span className="hero-side-note">SAFE. SEEN. SUPPORTED.</span>
      </section>
      <section className="love-intro section-pad">
        <div data-reveal>
          <p className="eyebrow">WHAT IS LOVE THREE?</p>
          <h2>
            Goodness Has
            <br />A Ripple Effect.
          </h2>
        </div>
        <div data-reveal>
          <p>
            Love THREE is a movement rooted in generosity, dedicated to transforming the lives of
            children and youth in need, wherever they are.
          </p>
          <p>
            Through small acts of service and shared compassion, we come together to create real
            change. It’s our way of signing off on goodness in the world.
          </p>
          <span className="love-signature">Love, THREE.</span>
        </div>
      </section>
      <section className="love-gift-scene">
        <img
          className="love-gift-backdrop"
          src="/images/editorial/love-giving.webp"
          alt="Volunteers sharing food with a community"
          width={900}
          height={700}
          loading="lazy"
          data-parallax
        />
        <div className="love-gift-caption" data-reveal>
          <h2>
            Every Gift Counts.
            <br />
            Every Story Matters.
          </h2>
          <p>Hope grows when we show up for each other.</p>
        </div>
        <DonationSelector />
      </section>
      <section className="love-values section-pad">
        <div className="section-heading" data-reveal>
          <h2>Who We Are.</h2>
          <p>
            Compassion in action.
            <br />
            One community at a time.
          </p>
        </div>
        <div className="love-values-grid">
          {[
            {
              title: 'Our Vision',
              image: 'love-vision',
              Icon: Heart,
              text: 'A world where children and youth feel safe, seen, and supported. Where every child has lasting hope for a brighter future.',
            },
            {
              title: 'Our Values',
              image: 'love-values',
              Icon: HandHeart,
              text: 'Compassion that meets real needs with empathy and care. Integrity that means doing what is right, even when no one is watching.',
            },
            {
              title: 'Our People',
              image: 'love-team',
              Icon: UsersRound,
              text: 'Passionate volunteers and dedicated leaders who believe in the ripple effect of doing good, creating real change one community at a time.',
            },
          ].map(({ title, image, Icon, text }) => (
            <article key={title} data-reveal>
              <div className="love-value-image">
                <img
                  src={`/images/editorial/${image}.webp`}
                  alt={
                    title === 'Our Vision'
                      ? 'Care for shared spaces through service'
                      : title === 'Our Values'
                        ? 'Community care in action'
                        : 'Love THREE community volunteers'
                  }
                  width={500}
                  height={500}
                  loading="lazy"
                />
              </div>
              <div>
                <Icon size={24} strokeWidth={1.25} />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="love-sharing flow-row">
        <div className="flow-image">
          <img
            src="/images/editorial/love-community.webp"
            alt="A person choosing to donate online"
            width={900}
            height={700}
            loading="lazy"
            data-parallax
          />
        </div>
        <div className="editorial-copy" data-reveal>
          <h2>
            Make A Difference.
            <br />
            Your Way.
          </h2>
          <p>
            You don’t have to be part of the THREE community to make a difference. Give once, give
            regularly, or simply help the story reach someone new.
          </p>
          <ul className="giving-ways">
            <li>
              <span>Give Today</span>
              <p>Choose a one-time gift, give at an event, or visit LoveThree.org.</p>
            </li>
            <li>
              <span>Make It A Habit</span>
              <p>
                Add a recurring donation to your Smart Ship or give through your THREE Back Office.
              </p>
            </li>
            <li>
              <span>Share The Good</span>
              <p>Raise awareness. Start a conversation. Every act of giving matters.</p>
            </li>
          </ul>
          <a href="https://www.threeinternational.com/en/account/login" className="text-link">
            Give Through Your Account <ArrowUpRight size={17} />
          </a>
          <ShareLove />
        </div>
      </section>
      <section className="love-closing">
        <Heart size={32} strokeWidth={1} />
        <h2>
          A Brighter Future
          <br />
          Starts With Us.
        </h2>
        <Button variant="light" asChild>
          <a href="#give">
            Give A Little Love <ArrowUpRight size={17} />
          </a>
        </Button>
      </section>
    </PageMotion>
  );
}
