'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, Search, X } from 'lucide-react';
import type { JournalSummary } from '@/lib/journal';
import { Button } from './ui/button';
import { normalizeSearchText } from '@/lib/product-search';

const categories = [
  'All Stories',
  'Everyday Wellness',
  'The Science',
  'Skin & Beauty',
  'Our Community',
];
export function JournalBrowser({ articles }: { articles: JournalSummary[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All Stories');
  const [limit, setLimit] = useState(12);
  const matches = articles.filter(
    (article) =>
      (category === 'All Stories' || category === article.category) &&
      normalizeSearchText(`${article.title} ${article.description}`).includes(
        normalizeSearchText(query),
      ),
  );
  return (
    <section className="journal-library section-pad" id="all-stories">
      <div className="journal-library-heading">
        <h2>A Little More Understanding.</h2>
        <div className="journal-search">
          <Search size={18} />
          <input
            aria-label="Search the journal"
            placeholder="Find A Story"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setLimit(12);
            }}
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setLimit(12);
              }}
              aria-label="Clear journal search"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>
      <div className="journal-categories" aria-label="Journal categories">
        {categories.map((name) => (
          <button
            key={name}
            aria-pressed={category === name}
            onClick={() => {
              setCategory(name);
              setLimit(12);
            }}
          >
            {name}
          </button>
        ))}
      </div>
      <p className="journal-result-count" role="status">
        {matches.length} {matches.length === 1 ? 'Story' : 'Stories'}
        {query ? ` For “${query}”` : ''}
      </p>
      <div className="journal-grid">
        {matches.slice(0, limit).map((article) => (
          <article key={article.slug} className="journal-card">
            <Link href={`/journal/${article.slug}`}>
              <div className="journal-card-image">
                <img src={article.image} alt="" width={800} height={600} loading="lazy" />
                <span>
                  <ArrowUpRight size={21} />
                </span>
              </div>
              <div className="article-meta">
                <span>{article.category}</span>
                <span>{article.readTime} Min Read</span>
              </div>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </Link>
          </article>
        ))}
      </div>
      {!matches.length && (
        <div className="journal-empty">
          <h3>A Fresh Search?</h3>
          <p>Try “GLP”, “skin”, or “science”, or explore all our stories.</p>
          <Button
            onClick={() => {
              setQuery('');
              setCategory('All Stories');
            }}
          >
            See All Stories
          </Button>
        </div>
      )}
      {limit < matches.length && (
        <div className="journal-more">
          <Button variant="outline" onClick={() => setLimit(limit + 12)}>
            More Stories <ArrowUpRight size={17} />
          </Button>
          <span>
            {Math.min(limit, matches.length)} Of {matches.length}
          </span>
        </div>
      )}
    </section>
  );
}
