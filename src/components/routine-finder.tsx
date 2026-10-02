'use client';

import { useState } from 'react';
import Link from 'next/link';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowUpRight, Check, X } from 'lucide-react';
import { getProduct, money } from '@/lib/products';
import { Button } from './ui/button';

const focuses = [
  { name: 'Weight management', description: 'Support your healthy habits.', slug: 'glp-three' },
  { name: 'Daily wellness', description: 'Start with everyday nutrition.', slug: 'vitalite' },
  { name: 'Healthy aging', description: 'Explore cellular support.', slug: 'eternel' },
  { name: 'Skin & beauty', description: 'Care from the inside out.', slug: 'collagene' },
  { name: 'Natural energy', description: 'Bring a little lift to your day.', slug: 'kynetik' },
];

export function RoutineFinder({ className = 'text-link' }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(0);
  const selected = focuses[focus];
  const product = getProduct(selected.slug)!;
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className={className}>
        Help me choose <ArrowUpRight size={17} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="routine-dialog">
          <div className="routine-intro">
            <Dialog.Title className="dialog-title">A good place to start.</Dialog.Title>
            <Dialog.Description>
              What would you like to focus on? Explore a formula for your everyday.
            </Dialog.Description>
          </div>
          <Dialog.Close className="dialog-close icon-button" aria-label="Close routine finder">
            <X />
          </Dialog.Close>
          <div className="routine-layout">
            <div className="routine-focuses" aria-label="Choose a wellness focus">
              {focuses.map((item, index) => (
                <button
                  key={item.slug}
                  aria-pressed={focus === index}
                  onClick={() => setFocus(index)}
                >
                  <span>
                    <strong>{item.name}</strong>
                    <small>{item.description}</small>
                  </span>
                  {focus === index ? <Check size={17} /> : <ArrowUpRight size={17} />}
                </button>
              ))}
            </div>
            <div
              className="routine-result"
              key={product.slug}
              aria-live="polite"
              aria-atomic="true"
            >
              <div className="routine-image">
                <img src={product.image} alt={product.name} width={440} height={440} />
              </div>
              <div className="routine-result-title">
                <h3>{product.name}</h3>
                <span>{money(product.price ?? 0)}</span>
              </div>
              <p>
                {product.slug === 'glp-three'
                  ? 'Daily support for weight management and food cravings.*'
                  : product.tagline}
              </p>
              <Button asChild>
                <Link href={`/products/${product.slug}`} onClick={() => setOpen(false)}>
                  Explore this formula <ArrowUpRight size={17} />
                </Link>
              </Button>
              <Link
                className="text-link"
                prefetch={false}
                href={`/shop?category=${encodeURIComponent(selected.name)}`}
                onClick={() => setOpen(false)}
              >
                See all {selected.name.toLowerCase()} <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
          <p className="routine-footnote">
            A starting point for discovery. Review ingredients and directions to decide what fits
            your routine.
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
