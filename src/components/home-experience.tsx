'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Pause,
  Play,
  ShieldCheck,
  FlaskConical,
  Leaf,
  RotateCcw,
  Star,
  Check,
} from 'lucide-react';
import { products, faqs } from '@/lib/products';
import { ProductCard } from './product-card';
import { Faq } from './faq';
import { Button } from './ui/button';
import { RoutineFinder } from './routine-finder';

const principles = [
  {
    name: 'Exploration',
    heading: 'Nature starts the conversation.',
    text: 'THREE looks to the natural world for distinctive phytonutrients. The search for better nutrition starts with understanding what is already there.',
  },
  {
    name: 'Curation',
    heading: 'Every ingredient has a purpose.',
    text: 'Scientists and nutrition experts bring carefully chosen ingredients together, refining and testing each formula with a specific goal in mind.',
  },
  {
    name: 'Absorption',
    heading: 'What you absorb matters.',
    text: 'THREE’s cellular absorption approach focuses on how nutrients reach your body. Because choosing ingredients is only part of the story.',
  },
];

export function SciencePanel() {
  const [active, setActive] = useState(2);
  const current = principles[active];
  return (
    <div className="science-glass">
      <div className="science-tabs" role="tablist" aria-label="THREE science principles">
        {principles.map((principle, index) => (
          <button
            key={principle.name}
            id={`principle-tab-${index}`}
            role="tab"
            aria-selected={active === index}
            aria-controls="principle-panel"
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(e) => {
              if (
                e.key === 'ArrowRight' ||
                e.key === 'ArrowLeft' ||
                e.key === 'Home' ||
                e.key === 'End'
              ) {
                e.preventDefault();
                const next =
                  e.key === 'Home'
                    ? 0
                    : e.key === 'End'
                      ? 2
                      : (index + (e.key === 'ArrowRight' ? 1 : 2)) % 3;
                setActive(next);
                document.getElementById(`principle-tab-${next}`)?.focus();
              }
            }}
          >
            {principle.name}
          </button>
        ))}
      </div>
      <div
        id="principle-panel"
        role="tabpanel"
        aria-labelledby={`principle-tab-${active}`}
        key={active}
        className="science-panel-content"
      >
        <h3>{current.heading}</h3>
        <p>{current.text}</p>
        <Link href="/science" className="text-link">
          Explore our science <ArrowUpRight size={18} />
        </Link>
      </div>
      <div className="glass-product">
        <img
          src="/images/vitalite-omega-3-daily-multivitamin.webp"
          width={440}
          height={440}
          alt="Vitalité daily supplement"
          loading="lazy"
        />
      </div>
    </div>
  );
}

const reviews = [
  { quote: 'great product, and easy to use', rating: 5, date: 'March 16, 2026' },
  { quote: 'Def noticed less snacking', rating: 5, date: 'February 10, 2026' },
  { quote: 'Love that it is all natural', rating: 4, date: 'February 11, 2026' },
  { quote: 'I wish it was cheaper & lasted longer!', rating: 5, date: 'March 11, 2026' },
];

export function Reviews() {
  const rail = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = rail.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (
      paused ||
      hovered ||
      !inView ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    const timer = window.setInterval(() => {
      const node = rail.current;
      if (!node) return;
      const atEnd = node.scrollLeft + node.clientWidth >= node.scrollWidth - 8;
      node.scrollTo({
        left: atEnd ? 0 : node.scrollLeft + (node.firstElementChild?.clientWidth ?? 380) + 20,
        behavior: 'smooth',
      });
    }, 5200);
    return () => window.clearInterval(timer);
  }, [paused, hovered, inView]);
  function move(direction: number) {
    setPaused(true);
    rail.current?.scrollBy({
      left: direction * ((rail.current.firstElementChild?.clientWidth ?? 380) + 20),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    });
  }
  return (
    <section className="reviews-section section-pad" id="reviews">
      <div className="section-heading">
        <div>
          <h2>A little everyday good.</h2>
        </div>
        <div className="rating-summary">
          <div className="stars" role="img" aria-label="4.78 out of 5 stars">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star size={15} fill="currentColor" key={i} />
            ))}
          </div>
          <span>
            <strong>4.78</strong> / 5 · 92 product reviews
          </span>
          <a
            href="https://www.threeinternational.com/en/productdetail/2/3478/US"
            target="_blank"
            rel="noreferrer"
          >
            Read reviews on THREE <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
      <div
        className="review-rail"
        ref={rail}
        aria-label="GLP THREE customer review excerpts"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setHovered(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setHovered(false);
        }}
      >
        {reviews.map((review, i) => (
          <article
            className="review-card"
            key={review.quote}
            tabIndex={0}
            aria-label={`Review ${i + 1} of ${reviews.length}`}
          >
            <div className="stars" role="img" aria-label={`${review.rating} out of 5 stars`}>
              {[0, 1, 2, 3, 4].map((n) => (
                <Star size={14} key={n} fill={n < review.rating ? 'currentColor' : 'none'} />
              ))}
            </div>
            <blockquote>“{review.quote}”</blockquote>
            <div className="review-meta">
              <span>GLP THREE customer</span>
              <time>{review.date}</time>
            </div>
          </article>
        ))}
      </div>
      <div className="reviews-bottom">
        <p>Excerpts from THREE’s published product reviews. Individual experiences vary.</p>
        <div className="carousel-controls">
          <button className="round-button" onClick={() => move(-1)} aria-label="Previous reviews">
            <ArrowLeft size={18} />
          </button>
          <button
            className="round-button"
            onClick={() => setPaused(!paused)}
            aria-label={paused ? 'Play review carousel' : 'Pause review carousel'}
          >
            {paused ? <Play size={15} /> : <Pause size={15} />}
          </button>
          <button className="round-button" onClick={() => move(1)} aria-label="Next reviews">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

export function HomeExperience() {
  const root = useRef<HTMLElement>(null);
  const hero = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const productRail = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [goal, setGoal] = useState('Everyday essentials');
  const selections: Record<string, string[]> = {
    'Everyday essentials': ['glp-three', 'vitalite', 'eternel', 'collagene'],
    'Weight management': ['glp-three', 'glp-three-four-pack'],
    'Skin & beauty': ['collagene', 'visage-super-serum', 'visage-creme-caviar', 'pure-cleanse'],
    'Natural energy': ['kynetik'],
  };
  const featured = selections[goal].map((slug) => products.find((p) => p.slug === slug)!);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.from('.hero-copy > *', {
          y: 24,
          opacity: 0,
          duration: 0.9,
          stagger: 0.09,
          ease: 'power3.out',
          clearProps: 'all',
        });
        gsap.to('.hero-media', {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.7 },
        });
        gsap.to('.hero-product-note', {
          y: -45,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.6 },
        });
        const reveal = gsap.timeline({
          scrollTrigger: {
            trigger: '.ritual-section',
            start: 'top 72%',
            end: 'bottom 65%',
            scrub: 0.8,
          },
        });
        reveal.fromTo(
          '.bottle-composition',
          { rotation: 16, y: 30 },
          { rotation: -8, y: 5, duration: 1 },
          0,
        );
        reveal.to('.dropper-assembly', { yPercent: -25, duration: 0.8 }, 0.18);
        reveal.to('.bottle-mouth, .bottle-neck', { opacity: 1, duration: 0.12 }, 0.2);
        const strokes = gsap.utils.toArray<SVGGeometryElement>(
          '.trust-strip svg path, .trust-strip svg line, .trust-strip svg polyline, .trust-strip svg circle',
        );
        strokes.forEach((stroke, index) => {
          const length = stroke.getTotalLength();
          gsap.fromTo(
            stroke,
            { strokeDasharray: length, strokeDashoffset: length },
            {
              strokeDashoffset: 0,
              duration: 0.85,
              delay: index * 0.035,
              ease: 'power2.out',
              scrollTrigger: { trigger: '.trust-strip', start: 'top 96%', once: true },
              clearProps: 'strokeDasharray,strokeDashoffset',
            },
          );
        });
        reveal.fromTo(
          '.bottle-shadow',
          { scaleX: 1, opacity: 0.15 },
          { scaleX: 0.8, opacity: 0.09, duration: 1 },
          0,
        );
        gsap.fromTo(
          '.science-backdrop',
          { yPercent: -5 },
          {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: {
              trigger: '.science-section',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          },
        );
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) =>
          gsap.from(element, {
            y: 25,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: { trigger: element, start: 'top 94%', once: true },
            clearProps: 'all',
          }),
        );
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setMotionAllowed(!media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    const element = video.current;
    if (!element || !hero.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !paused && motionAllowed && !document.hidden)
          void element.play().catch(() => setVideoReady(false));
        else element.pause();
      },
      { threshold: 0.05 },
    );
    observer.observe(hero.current);
    const visibility = () => {
      if (document.hidden) element.pause();
      else if (
        !paused &&
        motionAllowed &&
        hero.current &&
        hero.current.getBoundingClientRect().bottom > 0
      )
        void element.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', visibility);
    if (paused || !motionAllowed) element.pause();
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [paused, motionAllowed]);
  return (
    <main id="main" ref={root}>
      <section
        className="hero hero-bright"
        ref={hero}
        onPointerMove={(e) => {
          if (!motionAllowed || e.pointerType !== 'mouse') return;
          const rect = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty(
            '--pointer-x',
            `${((e.clientX - rect.left) / rect.width - 0.5) * 12}px`,
          );
          e.currentTarget.style.setProperty(
            '--pointer-y',
            `${((e.clientY - rect.top) / rect.height - 0.5) * 8}px`,
          );
        }}
        onPointerLeave={(e) => {
          e.currentTarget.style.setProperty('--pointer-x', '0px');
          e.currentTarget.style.setProperty('--pointer-y', '0px');
        }}
      >
        <div className="hero-media">
          <img
            className="hero-poster"
            src="/images/home-hero-v2-poster.jpg"
            width={1920}
            height={1080}
            fetchPriority="high"
            alt="GLP THREE amber dropper bottle on sunlit natural stone"
          />
          {motionAllowed && (
            <video
              ref={video}
              className={videoReady ? 'hero-video ready' : 'hero-video'}
              muted
              loop
              playsInline
              preload="metadata"
              poster="/images/home-hero-v2-poster.jpg"
              onPlaying={() => setVideoReady(true)}
              aria-hidden="true"
            >
              <source src="/video/home-hero-v2.mp4" type="video/mp4" />
            </video>
          )}
        </div>
        <div className="hero-copy">
          <p className="eyebrow">MEET GLP THREE™</p>
          <h1>
            A little bottle.
            <br />A new beginning.
          </h1>
          <p>
            Daily support for cravings and weight management.*
            <br />
            Peptides and botanicals. One small daily ritual.
          </p>
          <div className="hero-buttons">
            <Button asChild>
              <Link href="/products/glp-three">
                Shop GLP THREE <ArrowUpRight size={18} />
              </Link>
            </Button>
            <RoutineFinder className="hero-text-link" />
          </div>
        </div>
        <div className="hero-product-note">
          <span className="note-dot" />
          <div>
            <span>$85 · ONE-TIME PURCHASE</span>
            <strong>GLP THREE™</strong>
          </div>
          <Link href="/products/glp-three" aria-label="Discover GLP THREE">
            <ArrowUpRight size={24} />
          </Link>
        </div>
        {motionAllowed && (
          <button
            className="film-control"
            aria-label={paused ? 'Play header film' : 'Pause header film'}
            onClick={() => setPaused(!paused)}
          >
            {paused ? (
              <Play size={13} fill="currentColor" />
            ) : (
              <Pause size={13} fill="currentColor" />
            )}
            <span>{paused ? 'Play film' : 'Pause film'}</span>
          </button>
        )}
      </section>
      <div className="trust-strip">
        <span>
          <ShieldCheck size={19} /> Third-party tested
        </span>
        <span>
          <FlaskConical size={19} /> Formulated for bioavailability
        </span>
        <span>
          <Leaf size={19} /> Inspired by nature
        </span>
        <Link href="https://threemedia.earth/wp-content/uploads/2026/04/ReturnRefundPolicy_LTR_2604_V3.1_EN.pdf">
          <RotateCcw size={18} /> 30-day money-back guarantee
        </Link>
      </div>
      <section className="essentials-section section-pad" id="essentials">
        <div className="section-heading" data-reveal>
          <h2>Find your daily good.</h2>
          <Link className="text-link" href="/shop">
            Shop all products <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="goal-tabs" aria-label="Shop by wellness goal">
          {Object.keys(selections).map((label) => (
            <button
              key={label}
              aria-pressed={goal === label}
              onClick={() => {
                setGoal(label);
                productRail.current?.scrollTo({ left: 0 });
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="product-rail" ref={productRail}>
          {featured.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
        <div className="rail-bottom">
          <span>Thoughtfully formulated. Simply part of your day.</span>
          <div className="carousel-controls">
            <button
              className="round-button"
              aria-label="Previous products"
              onClick={() =>
                productRail.current?.scrollBy({
                  left: -350,
                  behavior: motionAllowed ? 'smooth' : 'instant',
                })
              }
            >
              <ArrowLeft size={18} />
            </button>
            <button
              className="round-button"
              aria-label="Next products"
              onClick={() =>
                productRail.current?.scrollBy({
                  left: 350,
                  behavior: motionAllowed ? 'smooth' : 'instant',
                })
              }
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
      <section className="ritual-section" id="the-three-difference">
        <div className="ritual-title" data-reveal>
          <p className="eyebrow">THE GLP THREE DIFFERENCE</p>
          <h2>
            A small ritual.
            <br />A thoughtful formula.
          </h2>
          <p>
            Meet MBC-267. A patented peptide complex, paired with carefully selected botanicals.
          </p>
          <Link href="/products/glp-three#ingredients" className="text-link">
            Get to know the formula <ArrowUpRight size={18} />
          </Link>
        </div>
        <div
          className="bottle-stage"
          role="img"
          aria-label="GLP THREE bottle with a dropper that gently lifts as you scroll"
        >
          <svg width="0" height="0" aria-hidden="true" className="product-masks">
            <defs>
              <clipPath id="glp-cap-silhouette" clipPathUnits="objectBoundingBox">
                <path d="M.441 .27V.144C.441 .11 .465 .083 .496 .083C.528 .083 .553 .111 .553 .142L.555 .271C.555 .29 .558 .301 .563 .312L.587 .312Q.592 .312 .592 .319L.592 .331L.594 .337L.596 .428L.61 .428Q.618 .428 .619 .437L.619 .487Q.618 .505 .609 .517L.39 .513Q.383 .506 .382 .488L.382 .438Q.382 .43 .39 .43L.403 .43L.403 .337L.406 .332L.406 .319Q.406 .314 .411 .314L.433 .312Q.441 .29 .441 .27Z" />
              </clipPath>
              <clipPath id="glp-body-silhouette" clipPathUnits="objectBoundingBox">
                <path d="M.414 .516C.403 .529 .379 .545 .379 .59L.38 .881Q.38 .907 .403 .911Q.5 .925 .599 .911Q.62 .905 .621 .887L.621 .582Q.621 .55 .596 .523L.582 .516Z" />
              </clipPath>
            </defs>
          </svg>
          <div className="bottle-orbit" />
          <div className="bottle-shadow" />
          <div className="bottle-composition">
            <div className="dropper-assembly">
              <div className="pipette">
                <span className="pipette-liquid" />
                <span className="pipette-highlight" />
              </div>
              <img
                className="bottle-cap"
                src="/images/glp-three-0.png"
                alt=""
                width={1080}
                height={1080}
                loading="lazy"
              />
            </div>
            <div className="bottle-neck" />
            <div className="bottle-mouth" />
            <img
              className="bottle-body"
              src="/images/glp-three-0.png"
              alt="GLP THREE dietary supplement"
              width={1080}
              height={1080}
              loading="lazy"
            />
          </div>
          <span className="bottle-caption">THOUGHTFULLY FORMULATED. DROP BY DROP.</span>
        </div>
        <div className="ritual-facts">
          <div>
            <span className="fact-symbol">
              <FlaskConical size={22} strokeWidth={1.2} />
            </span>
            <h3>Powered by peptides.</h3>
            <p>MBC-267, derived from salmon and mushrooms.</p>
          </div>
          <div>
            <span className="fact-symbol">
              <Leaf size={22} strokeWidth={1.2} />
            </span>
            <h3>Rooted in nature.</h3>
            <p>Panax ginseng, saffron, and hops extracts.</p>
          </div>
          <div>
            <span className="fact-symbol">
              <Check size={22} strokeWidth={1.2} />
            </span>
            <h3>Made for real life.</h3>
            <p>Weight-management support that complements healthy habits.*</p>
          </div>
        </div>
        <div className="ritual-footer">
          <span>THE DAILY DROP</span>
          <span>GLUTEN FREE &nbsp; / &nbsp; NON-GMO</span>
        </div>
      </section>
      <section className="science-section">
        <img
          className="science-backdrop"
          src="/images/HomeScienceDesktop.webp"
          width={900}
          height={506}
          alt="Walking through a lush forest, beside a quiet stream"
          loading="lazy"
        />
        <div className="science-copy" data-reveal>
          <h2>
            Good ingredients
            <br />
            are just the beginning.
          </h2>
          <p>
            A more considered approach to nutrition.
            <br />
            From where it starts to how it’s absorbed.
          </p>
        </div>
        <SciencePanel />
      </section>
      <Reviews />
      <section className="daily-scenes">
        <Link className="daily-scene" prefetch={false} href="/shop?category=Daily%20wellness">
          <img
            src="/images/HomeBentoLifestyleDesktop.webp"
            width={774}
            height={460}
            alt="THREE daily wellness products in a bright home"
            loading="lazy"
          />
          <div>
            <span>MAKE ROOM FOR WELLNESS</span>
            <h2>A routine that feels like you.</h2>
            <span className="scene-link">
              Explore daily essentials <ArrowUpRight size={19} />
            </span>
          </div>
        </Link>
        <Link className="daily-scene" prefetch={false} href="/shop?category=Skin%20%26%20beauty">
          <img
            src="/images/HomeBentoProduct8Desktop.webp"
            width={774}
            height={460}
            alt="THREE Visage skincare beside fresh botanicals"
            loading="lazy"
          />
          <div>
            <span>CARE, INSIDE AND OUT</span>
            <h2>A little more you time.</h2>
            <span className="scene-link">
              Discover skin & beauty <ArrowUpRight size={19} />
            </span>
          </div>
        </Link>
      </section>
      <section className="faq-section section-pad">
        <div data-reveal>
          <h2>
            Good questions.
            <br /> Straight answers.
          </h2>
          <p>
            Wellness should feel personal.
            <br />
            And easy to understand.
          </p>
          <a href="mailto:support@iii.earth" className="text-link">
            Talk to our team <ArrowUpRight size={17} />
          </a>
        </div>
        <Faq items={faqs} />
      </section>
      <section className="closing-section">
        <div>
          <h2>Start with something good.</h2>
        </div>
        <Button variant="light" asChild>
          <Link href="/shop">
            Find your THREE <ArrowUpRight size={18} />
          </Link>
        </Button>
      </section>
    </main>
  );
}
