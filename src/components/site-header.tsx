'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  ShoppingBag,
  X,
  Menu,
  Plus,
  Minus,
  UserRound,
  ChevronDown,
} from 'lucide-react';
import { products, money, storeUrl } from '@/lib/products';
import { cartKey } from '@/lib/cart';
import { matchesProduct } from '@/lib/product-search';
import { useStore } from './store-provider';
import { Button } from './ui/button';

export function SiteHeader() {
  const path = usePathname();
  const store = useStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const searchOpener = useRef<HTMLElement | null>(null);
  const bagOpener = useRef<HTMLElement | null>(null);
  const menuOpener = useRef<HTMLElement | null>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const count = store.items.reduce((total, item) => total + item.quantity, 0);
  const matches = products.filter((p) => matchesProduct(p, query));
  const subtotal = store.items.reduce((total, item) => {
    const product = products.find((p) => p.slug === item.slug)!;
    return (
      total +
      (item.plan === 'subscribe'
        ? (product.subscriptionPrice ?? product.price ?? 0)
        : (product.price ?? 0)) *
        item.quantity
    );
  }, 0);
  return (
    <>
      <div className="announcement">
        A little bottle. A fresh perspective.{' '}
        <Link href="/products/glp-three">
          Discover GLP THREE <ArrowUpRight size={12} />
        </Link>
      </div>
      <header className="site-header">
        <div className="nav-inner">
          <Link href="/" aria-label="THREE home" className="brand">
            <img src="/images/logo-lg-wide-white.png" alt="THREE" width={180} height={34} />
          </Link>
          <nav aria-label="Main navigation" className="desktop-nav">
            <div
              className="shop-nav"
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) setShopOpen(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setShopOpen(false);
                  e.currentTarget.querySelector('button')?.focus();
                }
              }}
            >
              <button
                aria-expanded={shopOpen}
                aria-controls="shop-menu"
                onClick={() => setShopOpen(!shopOpen)}
                className={path === '/shop' ? 'nav-link active' : 'nav-link'}
              >
                Shop <ChevronDown size={13} />
              </button>
              {shopOpen && (
                <div id="shop-menu" className="shop-menu">
                  <div>
                    <p className="eyebrow">YOUR DAILY GOOD</p>
                    {[
                      'All products',
                      'Weight management',
                      'Daily wellness',
                      'Skin & beauty',
                      'Natural energy',
                      'Bundles',
                    ].map((cat) => (
                      <Link
                        key={cat}
                        prefetch={false}
                        href={`/shop${cat === 'All products' ? '' : `?category=${encodeURIComponent(cat)}`}`}
                        onClick={() => setShopOpen(false)}
                      >
                        {cat}
                        <ArrowUpRight size={15} />
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/products/glp-three"
                    className="menu-feature"
                    onClick={() => setShopOpen(false)}
                  >
                    <img
                      src="/images/HomeBento3528Desktop.webp"
                      alt="GLP THREE on natural stone"
                      width={400}
                      height={267}
                    />
                    <span>
                      Meet GLP THREE <ArrowRight size={18} />
                    </span>
                  </Link>
                </div>
              )}
            </div>
            <Link className={path === '/science' ? 'nav-link active' : 'nav-link'} href="/science">
              The science
            </Link>
            <div
              className="about-nav"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) setAboutOpen(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setAboutOpen(false);
                  e.currentTarget.querySelector('button')?.focus();
                }
              }}
            >
              <button
                className="nav-link"
                aria-expanded={aboutOpen}
                aria-controls="about-menu"
                onClick={() => setAboutOpen(!aboutOpen)}
              >
                Our Story <ChevronDown size={13} />
              </button>
              {aboutOpen && (
                <div className="about-menu" id="about-menu">
                  {[
                    ['Our Story', '/our-story'],
                    ['Our Team', '/our-team'],
                    ['Scientific Advisory Board', '/scientific-advisory-board'],
                    ['THREE Farm', '/three-farm'],
                    ['Become An Ambassador', '/opportunity'],
                  ].map(([name, href]) => (
                    <Link key={href} href={href} onClick={() => setAboutOpen(false)}>
                      {name}
                      <ArrowUpRight size={15} />
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              className={path === '/love-three' ? 'nav-link active' : 'nav-link'}
              href="/love-three"
            >
              Love THREE
            </Link>
            <Link
              className={path.startsWith('/journal') ? 'nav-link active' : 'nav-link'}
              href="/journal"
            >
              The Journal
            </Link>
          </nav>
          <div className="nav-actions">
            <button
              className="icon-button"
              aria-label="Search products"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={20} strokeWidth={1.5} />
            </button>
            <a
              className="icon-button account-link"
              aria-label="Sign in to THREE"
              href="https://www.threeinternational.com/en/account/login"
            >
              <UserRound size={20} strokeWidth={1.5} />
            </a>
            <button
              className="bag-button"
              aria-label={`Open bag, ${count} items`}
              onClick={() => store.setCartOpen(true)}
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="bag-count">{count}</span>
            </button>
            <button
              className="icon-button mobile-menu-button"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={23} />
            </button>
          </div>
        </div>
      </header>
      <Dialog.Root open={searchOpen} onOpenChange={setSearchOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content
            className="search-dialog"
            onOpenAutoFocus={(e) => {
              searchOpener.current = document.activeElement as HTMLElement;
              e.preventDefault();
              searchInput.current?.focus();
            }}
            onCloseAutoFocus={(e) => {
              e.preventDefault();
              searchOpener.current?.focus();
            }}
          >
            <Dialog.Title className="dialog-title">Find your daily good.</Dialog.Title>
            <Dialog.Description className="muted">
              Search products, ingredients, or wellness goals.
            </Dialog.Description>
            <Dialog.Close className="dialog-close icon-button" aria-label="Close search">
              <X />
            </Dialog.Close>
            <div className="search-field">
              <Search size={22} />
              <input
                ref={searchInput}
                aria-label="Search the catalog"
                autoComplete="off"
                placeholder="Try GLP THREE, collagen, or energy"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <p className="search-count" role="status">
              {query ? `${matches.length} products found` : 'Explore the collection'}
            </p>
            <div className="search-results">
              {matches.map((product) => (
                <Link
                  href={`/products/${product.slug}`}
                  key={product.slug}
                  onClick={() => setSearchOpen(false)}
                >
                  <img src={product.image} alt="" width={70} height={70} />
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.category}</span>
                  </div>
                  <ArrowUpRight size={18} />
                </Link>
              ))}
              {!matches.length && (
                <p className="empty-message">
                  No matches yet. Try a product name or browse{' '}
                  <Link href="/shop" onClick={() => setSearchOpen(false)}>
                    all products
                  </Link>
                  .
                </p>
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <Dialog.Root open={store.cartOpen} onOpenChange={store.setCartOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content
            className="drawer cart-drawer"
            onOpenAutoFocus={() => {
              bagOpener.current = document.activeElement as HTMLElement;
            }}
            onCloseAutoFocus={(e) => {
              e.preventDefault();
              bagOpener.current?.focus();
            }}
          >
            <div className="drawer-heading">
              <Dialog.Title className="dialog-title">
                Your bag <span>({count})</span>
              </Dialog.Title>
              <Dialog.Close className="icon-button" aria-label="Close bag">
                <X />
              </Dialog.Close>
            </div>
            <Dialog.Description className="muted">
              A few good things for your every day.
            </Dialog.Description>
            {!count ? (
              <div className="empty-bag">
                <ShoppingBag size={48} strokeWidth={1} />
                <h3>Your next ritual starts here.</h3>
                <p>Explore formulas made with your everyday wellness in mind.</p>
                <Button asChild>
                  <Link href="/shop" onClick={() => store.setCartOpen(false)}>
                    Explore products <ArrowRight size={17} />
                  </Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {store.items.map((item) => {
                    const p = products.find((p) => p.slug === item.slug)!;
                    const key = cartKey(item);
                    const price =
                      item.plan === 'subscribe'
                        ? (p.subscriptionPrice ?? p.price ?? 0)
                        : (p.price ?? 0);
                    return (
                      <div className="cart-item" key={key}>
                        <Link href={`/products/${p.slug}`} onClick={() => store.setCartOpen(false)}>
                          <img src={p.image} alt={p.name} width={110} height={140} />
                        </Link>
                        <div className="cart-item-info">
                          <Link
                            href={`/products/${p.slug}`}
                            onClick={() => store.setCartOpen(false)}
                          >
                            {p.name}
                          </Link>
                          <span className="muted">
                            {item.plan === 'subscribe'
                              ? 'Smart Ship · every 28 days'
                              : 'One-time purchase'}
                          </span>
                          <strong>{money(price * item.quantity)}</strong>
                          <div className="cart-item-actions">
                            <div className="quantity">
                              <button
                                aria-label={`Decrease ${p.name} quantity`}
                                disabled={item.quantity === 1}
                                onClick={() => store.updateQuantity(key, item.quantity - 1)}
                              >
                                <Minus size={14} />
                              </button>
                              <span>{item.quantity}</span>
                              <button
                                aria-label={`Increase ${p.name} quantity`}
                                disabled={item.quantity === 20}
                                onClick={() => store.updateQuantity(key, item.quantity + 1)}
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <button className="text-button" onClick={() => store.removeItem(key)}>
                              Remove
                            </button>
                          </div>
                          <a
                            className="cart-source"
                            href={p.sourceUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Buy this product at THREE <ArrowUpRight size={12} />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="cart-footer">
                  <div className="subtotal">
                    <span>Estimated subtotal</span>
                    <strong>{money(subtotal)}</strong>
                  </div>
                  <p className="fine-print">
                    Your selections are saved here and do not transfer automatically. Add them again
                    on THREE’s official store, where you’ll confirm current prices and delivery
                    options.
                  </p>
                  <Button asChild className="full-width">
                    <a
                      href={
                        store.items.length === 1
                          ? products.find((p) => p.slug === store.items[0].slug)!.sourceUrl
                          : storeUrl
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      Continue at THREE <ArrowUpRight size={18} />
                    </a>
                  </Button>
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content
            className="drawer mobile-drawer"
            onOpenAutoFocus={() => {
              menuOpener.current = document.activeElement as HTMLElement;
            }}
            onCloseAutoFocus={(e) => {
              e.preventDefault();
              menuOpener.current?.focus();
            }}
          >
            <div className="drawer-heading">
              <Dialog.Title>
                <img src="/images/three-logo-new.webp" width={150} height={27} alt="THREE" />
              </Dialog.Title>
              <Dialog.Close className="icon-button" aria-label="Close menu">
                <X />
              </Dialog.Close>
            </div>
            <Dialog.Description className="sr-only">
              Explore THREE products and science
            </Dialog.Description>
            <nav aria-label="Mobile navigation">
              {[
                ['Shop all', '/shop'],
                ['GLP THREE', '/products/glp-three'],
                ['The science', '/science'],
                ['Our story', '/our-story'],
                ['Our team', '/our-team'],
                ['Scientific advisory board', '/scientific-advisory-board'],
                ['THREE farm', '/three-farm'],
                ['LOVE THREE', '/love-three'],
                ['The journal', '/journal'],
                ['Become an ambassador', '/opportunity'],
              ].map(([name, href]) => (
                <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
                  {name}
                  <ArrowUpRight size={24} />
                </Link>
              ))}
            </nav>
            <div className="mobile-menu-bottom">
              <p>
                Good science.
                <br />
                Everyday possibilities.
              </p>
              <a href="https://www.threeinternational.com/en/account/login">
                Sign in to your account <ArrowUpRight size={15} />
              </a>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
