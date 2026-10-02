'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, Search, X } from 'lucide-react';
import { categories, products } from '@/lib/products';
import { matchesProduct } from '@/lib/product-search';
import { ProductCard } from './product-card';

export function Catalog({ category }: { category: string }) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('featured');
  const filtered = products.filter(
    (product) =>
      (category === 'All products' || product.category === category) &&
      matchesProduct(product, query),
  );
  if (sort === 'price-asc') filtered.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
  if (sort === 'price-desc') filtered.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
  if (sort === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));
  return (
    <section className="catalog-section section-pad" id="collection">
      <nav className="catalog-tabs" aria-label="Product categories">
        {categories.map((value) => (
          <Link
            key={value}
            prefetch={false}
            href={`/shop${value === 'All products' ? '' : `?category=${encodeURIComponent(value)}`}#collection`}
            scroll={false}
            aria-current={category === value ? 'true' : undefined}
          >
            {value}
          </Link>
        ))}
      </nav>
      <div className="catalog-toolbar">
        <span role="status">
          {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
          {category !== 'All products' ? ` for ${category.toLowerCase()}` : ' for your every day'}
        </span>
        <div>
          <div className="catalog-search">
            <Search size={15} />
            <input
              aria-label="Filter products"
              placeholder="Find a product"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button aria-label="Clear product search" onClick={() => setQuery('')}>
                <X size={14} />
              </button>
            )}
          </div>
          <label className="catalog-sort">
            <span className="sr-only">Sort products</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </label>
        </div>
      </div>
      <div className="catalog-grid">
        {filtered.map((product, index) => (
          <ProductCard key={product.slug} product={product} index={index} />
        ))}
      </div>
      {!filtered.length && (
        <div className="catalog-empty">
          <h2>A fresh search?</h2>
          <p>We couldn’t find a match. Try another name or wellness goal.</p>
          <button className="text-link" onClick={() => setQuery('')}>
            Clear search <ArrowUpRight size={16} />
          </button>
        </div>
      )}
    </section>
  );
}
