import { test } from 'node:test';
import assert from 'node:assert/strict';
import { addCartItem, normalizeCart } from '../src/lib/cart';
import { matchesProduct } from '../src/lib/product-search';
import { products } from '../src/lib/products';

test('corrupt stored carts do not become purchasable entries', () => {
  assert.deepEqual(normalizeCart({ unexpected: true }, ['glp-three']), []);
  assert.deepEqual(
    normalizeCart(
      [
        { slug: 'unknown', plan: 'once', quantity: 1 },
        { slug: 'glp-three', plan: 'once', quantity: Infinity },
        { slug: 'glp-three', plan: 'invalid', quantity: 2 },
      ],
      ['glp-three'],
    ),
    [],
  );
  assert.deepEqual(
    normalizeCart(
      [
        { slug: 'glp-three', plan: 'once', quantity: 12 },
        { slug: 'glp-three', plan: 'once', quantity: 12 },
      ],
      ['glp-three'],
    ),
    [{ slug: 'glp-three', plan: 'once', quantity: 20 }],
  );
});

test('purchase plans remain separate while repeat additions merge and are bounded', () => {
  const items = addCartItem([{ slug: 'glp-three', plan: 'once', quantity: 19 }], {
    slug: 'glp-three',
    plan: 'once',
    quantity: 5,
  });
  assert.equal(items[0].quantity, 20);
  assert.equal(addCartItem(items, { slug: 'glp-three', plan: 'subscribe', quantity: 1 }).length, 2);
});

test('search finds accented product names from ordinary spelling and searches ingredients', () => {
  for (const name of ['eternel', 'vitalite', 'revive', 'purifi', 'imune', 'creme'])
    assert.ok(
      products.some((p) => matchesProduct(p, name)),
      name,
    );
  assert.ok(matchesProduct(products[0], 'saffron'));
  assert.ok(matchesProduct(products[0], '  GLP THREE  '));
});

test('catalog list items are individual values, not nested concatenations', () => {
  const eternel = products.find((p) => p.slug === 'eternel')!;
  assert.deepEqual(eternel.ingredients, [
    'Resveratrol',
    'Superfruits',
    'Glutathione',
    'Coenzyme Q10 (CoQ10)',
  ]);
  assert.equal(
    eternel.benefits[0],
    'Protects and supports cells from damage and premature aging.*',
  );
});

test('bundle contents match the current product descriptions', () => {
  const impact = products.find((p) => p.slug === 'impact-pack')!;
  assert.deepEqual(impact.ingredients, [
    'Revíve',
    'GLP THREE™',
    'Purifí',
    'Kynetik Clean Caffeine Berry Blast',
  ]);
});
