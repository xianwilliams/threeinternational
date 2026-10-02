import type { Product } from './products';

export const normalizeSearchText = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

export function matchesProduct(product: Product, query: string) {
  return normalizeSearchText(
    [product.name, product.slug, product.category, product.tagline, ...product.ingredients].join(
      ' ',
    ),
  ).includes(normalizeSearchText(query.trim()));
}
