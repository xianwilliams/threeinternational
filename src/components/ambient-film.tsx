'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

export function AmbientFilm({ src, poster, alt }: { src: string; poster: string; alt: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const [allowed, setAllowed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setAllowed(!preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    const element = video.current;
    if (!element || !container.current) return;
    let visible = false;
    const sync = () => {
      if (visible && allowed && !paused && !document.hidden)
        void element.play().catch(() => setReady(false));
      else element.pause();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.05 },
    );
    observer.observe(container.current);
    document.addEventListener('visibilitychange', sync);
    sync();
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      element.pause();
    };
  }, [allowed, paused]);
  return (
    <>
      <div ref={container} className="ambient-media" data-parallax>
        <img src={poster} alt={alt} width={1920} height={1080} fetchPriority="high" />
        {allowed && (
          <video
            ref={video}
            className={ready ? 'ready' : ''}
            muted
            loop
            playsInline
            preload="metadata"
            poster={poster}
            aria-hidden="true"
            onPlaying={() => setReady(true)}
          >
            <source src={src} type="video/mp4" />
          </video>
        )}
      </div>
      {allowed && (
        <button
          className="film-control"
          aria-label={paused ? 'Play header film' : 'Pause header film'}
          onClick={() => setPaused(!paused)}
        >
          {paused ? <Play size={13} /> : <Pause size={13} />}
          <span>{paused ? 'Play Film' : 'Pause Film'}</span>
        </button>
      )}
    </>
  );
}
