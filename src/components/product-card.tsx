'use client';
import Link from 'next/link';
import { ArrowUpRight, Plus } from 'lucide-react';
import { money, type Product } from '@/lib/products';
import { useStore } from './store-provider';

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addItem } = useStore();
  return (
    <article className={`product-card product-tone-${index % 4}`}>
      <div className="product-card-image">
        <span className="product-category">{product.category}</span>
        <Link href={`/products/${product.slug}`} tabIndex={-1} aria-hidden="true">
          <img src={product.image} alt="" width={440} height={440} loading="lazy" />
        </Link>
        <button
          className="quick-add"
          aria-label={`Add ${product.name} to bag`}
          onClick={() => addItem(product.slug)}
        >
          <Plus size={20} strokeWidth={1.5} />
        </button>
      </div>
      <Link className="product-card-title" href={`/products/${product.slug}`}>
        <h3>
          {product.name}
          {product.slug === 'glp-three' && <sup>™</sup>}
        </h3>
        <ArrowUpRight size={18} />
      </Link>
      <p className="product-card-description">{product.tagline}</p>
      <div className="product-card-price">
        <span>{money(product.price ?? 0)}</span>
        {product.subscriptionPrice && (
          <span>{money(product.subscriptionPrice)} with Smart Ship</span>
        )}
      </div>
    </article>
  );
}
