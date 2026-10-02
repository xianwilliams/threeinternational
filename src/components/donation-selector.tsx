'use client';

import { useState } from 'react';
import { ArrowUpRight, Heart, Check, Share2 } from 'lucide-react';
import { Button } from './ui/button';

const gifts = [
  { amount: 5, id: 3229 },
  { amount: 25, id: 3230 },
  { amount: 50, id: 3231 },
  { amount: 100, id: 3232 },
];
export function DonationSelector() {
  const [amount, setAmount] = useState(25);
  const selected = gifts.find((gift) => gift.amount === amount)!;
  return (
    <div className="donation-selector" id="give" data-reveal>
      <Heart size={26} strokeWidth={1.2} />
      <h2>
        A Little Love.
        <br />A Lasting Difference.
      </h2>
      <p>
        Your gift supports Love THREE’s mission for children and youth. Choose what feels right for
        you.
      </p>
      <fieldset>
        <legend>Choose A One-Time Gift</legend>
        <div className="donation-amounts">
          {gifts.map((gift) => (
            <button
              key={gift.amount}
              type="button"
              aria-pressed={amount === gift.amount}
              onClick={() => setAmount(gift.amount)}
            >
              ${gift.amount}
              {amount === gift.amount && <Check size={13} />}
            </button>
          ))}
        </div>
      </fieldset>
      <Button asChild className="full-width">
        <a
          href={`https://www.threeinternational.com/en/productdetail/2/${selected.id}/US`}
          target="_blank"
          rel="noreferrer"
        >
          Give ${amount} <ArrowUpRight size={18} />
        </a>
      </Button>
      <p className="donation-note">Continue to THREE’s official store to complete your gift.</p>
    </div>
  );
}
export function ShareLove() {
  const [status, setStatus] = useState('');
  async function share() {
    const url = 'https://www.threeinternational.com/en/Donate';
    try {
      if (navigator.share)
        await navigator.share({
          title: 'Love THREE',
          text: 'Help children and youth feel safe, seen, and supported.',
          url,
        });
      else {
        await navigator.clipboard.writeText(url);
        setStatus('Link Copied');
      }
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError'))
        setStatus('Share This Page With Someone You Love.');
    }
  }
  return (
    <div className="share-love">
      <button className="text-link" onClick={share}>
        <Share2 size={17} />
        Share Love THREE
      </button>
      <span role="status">{status}</span>
    </div>
  );
}
