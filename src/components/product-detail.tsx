'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Plus,
  Minus,
  ShieldCheck,
  RotateCcw,
  Star,
  ExternalLink,
} from 'lucide-react';
import { disclaimer, faqs, money, products, type Product } from '@/lib/products';
import type { PurchasePlan } from '@/lib/cart';
import { useStore } from './store-provider';
import { Button } from './ui/button';
import { ProductCard } from './product-card';
import { Faq } from './faq';

export function ProductDetail({ product }: { product: Product }) {
  const [plan, setPlan] = useState<PurchasePlan>('once');
  const [quantity, setQuantity] = useState(1);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const purchaseActions = useRef<HTMLDivElement>(null);
  const [showQuickBuy, setShowQuickBuy] = useState(false);
  const { addItem } = useStore();
  const price =
    plan === 'subscribe' ? (product.subscriptionPrice ?? product.price ?? 0) : (product.price ?? 0);
  const isGlp = product.slug === 'glp-three';
  const isBundle = product.slug === 'impact-pack';
  const isSkin = [
    'visage-super-serum',
    'visage-creme-caviar',
    'pure-cleanse',
    'radiant-toner',
    'visage-collection',
  ].includes(product.slug);
  const gallery = product.gallery.length ? product.gallery : [product.image];
  const related = products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 4);
  const recommendations =
    related.length >= 2 ? related : products.filter((p) => p.slug !== product.slug).slice(0, 4);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setShowQuickBuy((purchaseActions.current?.getBoundingClientRect().bottom ?? 1) < 0);
        frame = 0;
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return (
    <main id="main">
      <div className="product-breadcrumb">
        <Link href="/shop">
          <ArrowLeft size={13} /> All products
        </Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>
      <section
        className={`product-detail product-detail-${isGlp ? 'glp' : isSkin ? 'skin' : 'wellness'}`}
      >
        <div className="product-gallery">
          <div className={`gallery-main ${galleryIndex === 0 ? 'packshot' : ''}`}>
            <span className="gallery-tag">{product.category}</span>
            <img
              key={gallery[galleryIndex]}
              src={gallery[galleryIndex]}
              alt={`${product.name}, ${galleryIndex === 0 ? 'product packaging' : `lifestyle view ${galleryIndex}`}`}
              width={1080}
              height={1080}
              fetchPriority="high"
            />
            <span className="gallery-number">
              0{galleryIndex + 1} / 0{gallery.length}
            </span>
          </div>
          {gallery.length > 1 && (
            <div className="gallery-thumbnails" aria-label="Product photographs">
              {gallery.map((src, index) => (
                <button
                  key={src}
                  aria-label={`View ${product.name} photo ${index + 1}`}
                  aria-pressed={galleryIndex === index}
                  onClick={() => setGalleryIndex(index)}
                >
                  <img src={src} alt="" width={80} height={80} />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="purchase-panel">
          <p className="eyebrow">{product.category.toUpperCase()}</p>
          <h1>
            {product.name}
            {isGlp && <sup>™</sup>}
          </h1>
          <p className="product-lead">{product.tagline}</p>
          {isGlp && (
            <a
              className="product-rating"
              href={`${product.sourceUrl}#reviews-link-top`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="stars">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={12} fill="currentColor" />
                ))}
              </span>
              <span>4.78 · 92 customer reviews</span>
              <ArrowUpRight size={12} />
            </a>
          )}
          <p className="product-description">{product.description}</p>
          <ul className="purchase-benefits">
            {product.benefits.slice(0, 3).map((benefit) => (
              <li key={benefit}>
                <Check size={15} />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
          <fieldset className="purchase-options">
            <legend>Choose your purchase</legend>
            <label className={plan === 'once' ? 'purchase-option selected' : 'purchase-option'}>
              <input
                type="radio"
                name="purchase-plan"
                value="once"
                checked={plan === 'once'}
                onChange={() => setPlan('once')}
              />
              <span>One-time purchase</span>
              <strong>{money(product.price ?? 0)}</strong>
            </label>
            {product.subscriptionPrice !== null && (
              <label
                className={plan === 'subscribe' ? 'purchase-option selected' : 'purchase-option'}
              >
                <div>
                  <input
                    type="radio"
                    name="purchase-plan"
                    value="subscribe"
                    checked={plan === 'subscribe'}
                    onChange={() => setPlan('subscribe')}
                  />
                  <span>
                    Smart Ship <span className="save-tag">Save 10%</span>
                  </span>
                  <strong>{money(product.subscriptionPrice)}</strong>
                </div>
                <p>Delivered every 28 days. Pause, modify, or cancel anytime.</p>
              </label>
            )}
          </fieldset>
          <div className="purchase-actions" ref={purchaseActions}>
            <div className="quantity">
              <button
                aria-label="Decrease quantity"
                disabled={quantity === 1}
                onClick={() => setQuantity(quantity - 1)}
              >
                <Minus size={15} />
              </button>
              <span aria-live="polite">{quantity}</span>
              <button
                aria-label="Increase quantity"
                disabled={quantity === 20}
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus size={15} />
              </button>
            </div>
            <Button onClick={() => addItem(product.slug, plan, quantity)}>
              Add to bag <span>{money(price * quantity)}</span>
              <ArrowUpRight size={17} />
            </Button>
          </div>
          <p className="purchase-handoff">
            Purchases are completed through THREE’s official store.
          </p>
          <div className="purchase-trust">
            <span>
              <ShieldCheck size={15} /> Third-party tested
            </span>
            <a href="https://threemedia.earth/wp-content/uploads/2026/04/ReturnRefundPolicy_LTR_2604_V3.1_EN.pdf">
              <RotateCcw size={15} /> 30-day guarantee
            </a>
          </div>
          {isGlp && (
            <Link href="/products/glp-three-four-pack" className="bundle-nudge">
              <div>
                <span>MAKE IT A ROUTINE</span>
                <strong>Explore the GLP THREE 4 Pack</strong>
              </div>
              <ArrowUpRight size={20} />
            </Link>
          )}
          <p className="product-disclaimer">
            {isSkin ? 'Review the complete ingredient list and directions before use.' : disclaimer}
          </p>
        </div>
      </section>
      <nav className="product-anchor-nav" aria-label="Product details">
        <a href="#overview">A closer look</a>
        <a href="#ingredients">What’s inside</a>
        <a href="#product-questions">Good to know</a>
      </nav>
      <section className="product-editorial" id="overview">
        <div className="product-editorial-copy">
          <p className="eyebrow">DESIGNED FOR YOUR EVERYDAY</p>
          <h2>{product.headline}</h2>
          <p>
            {isGlp
              ? 'Healthy habits are personal. GLP THREE is designed to support your weight-management routine, alongside balanced nutrition and regular movement.*'
              : product.description}
          </p>
          <a href={product.sourceUrl} target="_blank" rel="noreferrer" className="text-link">
            See the full product details <ArrowUpRight size={17} />
          </a>
        </div>
        <img
          src={isGlp ? '/images/GLPTHREE_Additional2.webp' : (gallery[1] ?? product.image)}
          width={1200}
          height={1200}
          alt={
            isGlp
              ? 'GLP THREE fits into a small everyday bag'
              : `${product.name} in an everyday setting`
          }
          loading="lazy"
        />
      </section>
      <section id="ingredients" className="ingredient-section section-pad">
        <div>
          <p className="eyebrow">
            {isBundle ? 'YOUR ROUTINE, TOGETHER' : 'THE FORMULA, EXPLAINED'}
          </p>
          <h2>
            {isBundle ? (
              <>
                Good things.
                <br />
                Better together.
              </>
            ) : (
              <>
                Every ingredient.
                <br />A reason to be here.
              </>
            )}
          </h2>
          <p>
            {isGlp
              ? 'A patented peptide complex meets three selected botanical extracts.'
              : isBundle
                ? 'Explore what is included in this collection.'
                : 'A closer look at the ingredients in your daily formula.'}
          </p>
          <a
            href={
              isGlp
                ? 'https://threemedia.earth/wp-content/uploads/2026/01/2601_FactSheet-GLPTHREE_v1_ENG_FNL.pdf'
                : product.sourceUrl
            }
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            {isGlp ? 'View the product fact sheet' : 'View the complete product label'}{' '}
            <ExternalLink size={15} />
          </a>
        </div>
        <div className="ingredient-list">
          {product.ingredients.length ? (
            product.ingredients.map((ingredient, index) => (
              <div key={ingredient}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{ingredient}</h3>
              </div>
            ))
          ) : (
            <p>
              Find complete ingredients for each product in this collection on THREE’s official
              product page.
            </p>
          )}
          <p className="fine-print">
            {isGlp
              ? 'Contains ingredients derived from fish (salmon). Review the product label for complete ingredients, allergens, warnings, and directions.'
              : 'Selected ingredients shown. Review the complete label for ingredients, allergens, warnings, and directions.'}
          </p>
        </div>
      </section>
      <section id="product-questions" className="faq-section section-pad">
        <div>
          <p className="eyebrow">GOOD TO KNOW</p>
          <h2>
            Your questions,
            <br /> answered.
          </h2>
          <p>Make your next step an informed one.</p>
        </div>
        <Faq
          items={
            isGlp
              ? faqs
              : [
                  faqs[3],
                  faqs[4],
                  {
                    question: 'Where can I find directions and the full label?',
                    answer:
                      'Visit this product’s official THREE page for its full label, directions, warnings, and current availability. For questions about your personal needs, consult your healthcare professional before starting a supplement.',
                  },
                ]
          }
        />
      </section>
      <section className="related-products section-pad">
        <div className="section-heading">
          <h2>Good company for your routine.</h2>
          <Link href="/shop" className="text-link">
            Shop all <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="product-rail">
          {recommendations.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>
      {showQuickBuy && (
        <aside className="quick-buy" aria-label="Your selected product">
          <img src={product.image} alt="" width={56} height={56} />
          <div>
            <strong>{product.name}</strong>
            <span>
              {plan === 'subscribe' ? 'Smart Ship · every 28 days' : 'One-time purchase'}
              {quantity > 1 ? ` · Qty ${quantity}` : ''}
            </span>
          </div>
          <Button onClick={() => addItem(product.slug, plan, quantity)}>
            Add to bag <span>{money(price * quantity)}</span>
            <ArrowUpRight size={16} />
          </Button>
        </aside>
      )}
    </main>
  );
}
