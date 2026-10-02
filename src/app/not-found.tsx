import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
export default function NotFound() {
  return (
    <main id="main" className="not-found">
      <p className="eyebrow">A SMALL DETOUR</p>
      <h1>Let’s find your way.</h1>
      <p>That page is no longer here. There’s still plenty of good to discover.</p>
      <Button asChild>
        <Link href="/shop">
          Explore the collection <ArrowRight size={17} />
        </Link>
      </Button>
    </main>
  );
}
