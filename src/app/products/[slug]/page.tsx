import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProduct, products } from '@/lib/products';
import { ProductDetail } from '@/components/product-detail';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const product = getProduct((await params).slug);
  return { title: product?.name ?? 'Product Not Found', description: product?.description };
}
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  return <ProductDetail key={product.slug} product={product} />;
}
