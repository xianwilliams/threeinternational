import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { journal, articleDate } from '@/lib/journal';
import { PageMotion } from '@/components/page-motion';

export const dynamicParams = false;
export function generateStaticParams() {
  return journal.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = journal.find((item) => item.slug === slug);
  return article
    ? {
        title: article.title.replace(
          /(^|\s)(\p{L})/gu,
          (_, space: string, letter: string) => space + letter.toUpperCase(),
        ),
        description: article.description,
      }
    : {};
}
export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = journal.find((item) => item.slug === slug);
  if (!article) notFound();
  const related = journal
    .filter((item) => item.category === article.category && item.slug !== slug)
    .slice(0, 3);
  return (
    <PageMotion className="article-page">
      <header className="article-heading section-pad">
        <Link className="text-link" href="/journal">
          <ArrowLeft size={16} />
          The Journal
        </Link>
        <div className="article-meta">
          <span>{article.category}</span>
          <span>{article.readTime} Min Read</span>
        </div>
        <h1>{article.title}</h1>
        <p>
          By {article.author} <span>·</span>{' '}
          <time dateTime={article.date}>{articleDate(article.date)}</time>
        </p>
      </header>
      <div className="article-cover">
        <img
          src={article.image}
          alt={article.title}
          width={1600}
          height={1000}
          fetchPriority="high"
          data-parallax
        />
      </div>
      <div className="article-layout section-pad">
        <aside>
          <span>THE THREE JOURNAL</span>
          <p>
            A Closer Look.
            <br />A More Informed Everyday.
          </p>
          <Link href="/shop" className="text-link">
            Explore Products <ArrowUpRight size={15} />
          </Link>
        </aside>
        {/* Locally imported brand articles. The import strips scripts, styles, event attributes, and unsafe URLs. */}
        <article className="article-prose" dangerouslySetInnerHTML={{ __html: article.html }} />
      </div>
      <section className="related-stories section-pad">
        <div className="section-heading">
          <h2>Keep Exploring.</h2>
          <Link className="text-link" href="/journal">
            All Stories <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="journal-grid">
          {related.map((item) => (
            <article className="journal-card" key={item.slug}>
              <Link href={`/journal/${item.slug}`}>
                <div className="journal-card-image">
                  <img src={item.image} alt="" width={800} height={600} loading="lazy" />
                  <span>
                    <ArrowUpRight size={21} />
                  </span>
                </div>
                <div className="article-meta">
                  <span>{item.category}</span>
                  <span>{item.readTime} Min Read</span>
                </div>
                <h3>{item.title}</h3>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </PageMotion>
  );
}
