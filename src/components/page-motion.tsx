'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function PageMotion({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
          gsap.from(element, {
            y: 32,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: { trigger: element, start: 'top 94%', once: true },
          });
        });
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((element) => {
          gsap.fromTo(
            element,
            { yPercent: -4 },
            {
              yPercent: 4,
              ease: 'none',
              scrollTrigger: {
                trigger: element.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.7,
              },
            },
          );
        });
        if (root.current?.querySelector('.ingredient-composition')) {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: '.story-formation',
              start: 'top 75%',
              end: 'bottom 65%',
              scrub: 0.8,
            },
          });
          timeline.to('.ingredient-orbit', { rotation: 22, duration: 1 }, 0);
          timeline.to(
            '.ingredient-fragment',
            {
              x: 0,
              y: 0,
              scale: 0.18,
              opacity: 0,
              stagger: 0.045,
              duration: 0.75,
              ease: 'power2.inOut',
            },
            0.18,
          );
          timeline.fromTo(
            '.formed-product',
            { y: 26, scale: 0.7, opacity: 0.65, rotation: -12 },
            { y: 0, scale: 1, opacity: 1, rotation: 4, duration: 0.85 },
            0.12,
          );
          timeline.to('.formation-ring', { scale: 0.78, opacity: 0.655, duration: 1 }, 0);
        }
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);
  return (
    <main id="main" ref={root} className={className}>
      {children}
    </main>
  );
}
