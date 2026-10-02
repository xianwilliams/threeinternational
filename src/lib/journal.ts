import articles from './journal.json';

export type JournalArticle = (typeof articles)[number];
export type JournalSummary = Omit<JournalArticle, 'html' | 'sourceUrl'>;
export const journal = articles;
export const journalSummaries: JournalSummary[] = articles.map(
  ({ slug, title, description, image, date, author, category, readTime }) => ({
    slug,
    title,
    description,
    image,
    date,
    author,
    category,
    readTime,
  }),
);
export function articleDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date));
}
