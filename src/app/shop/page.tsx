import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { Catalog } from '@/components/catalog';
import { categories } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { RoutineFinder } from '@/components/routine-finder';

export const metadata: Metadata = {
  title: 'Shop Your Daily Good',
  description:
    'Explore THREE supplements and skincare. Shop by wellness goal, compare prices, and find a formula for your daily routine.',
};
export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: requested } = await searchParams;
  const category = categories.find((value) => value === requested) ?? 'All products';
  return (
    <main id="main">
      <section className="shop-hero">
        <div>
          <p className="eyebrow">THE THREE COLLECTION</p>
          <h1>
            Your everyday.
            <br />
            Only better.
          </h1>
          <p>
            Thoughtfully formulated supplements and skincare.
            <br />
            Find the good that fits your life.
          </p>
          <Button asChild variant="outline">
            <a href="#collection">
              Find your formula <ArrowUpRight size={17} />
            </a>
          </Button>
        </div>
        <img
          src="/images/HomeBentoLifestyleDesktop.webp"
          width={774}
          height={460}
          alt="THREE wellness products arranged in natural morning light"
          fetchPriority="high"
        />
        <span className="shop-hero-caption">GOOD SCIENCE. DAILY POSSIBILITY.</span>
      </section>
      <Catalog key={category} category={category} />
      <section className="shop-assistance">
        <div>
          <h2>A little help finding your fit?</h2>
          <p>Choose your focus. Meet a formula. Find a place to start.</p>
        </div>
        <RoutineFinder />
      </section>
    </main>
  );
}
