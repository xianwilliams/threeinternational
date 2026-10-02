import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { journal } from '../src/lib/journal';
import people from '../src/lib/people.json';
import { products } from '../src/lib/products';
import { normalizeSearchText } from '../src/lib/product-search';

test('the full English journal is local with unique readable article routes and assets', () => {
  assert.equal(journal.length, 130);
  assert.equal(new Set(journal.map((article) => article.slug)).size, 130);
  for (const article of journal) {
    assert.ok(article.html.length > 300, article.slug);
    assert.ok(!Number.isNaN(Date.parse(article.date)), article.slug);
    assert.ok(existsSync(`public${article.image}`), article.image);
    assert.doesNotMatch(article.html, /<(script|style|iframe|form)\b|\bon\w+=|javascript:/i);
    for (const [, image] of article.html.matchAll(/<img src="([^"]+)"/g))
      assert.ok(existsSync(`public${image}`), image);
    for (const [, slug] of article.html.matchAll(/href="\/journal\/([^"#?]+)"/g))
      assert.ok(
        journal.some((item) => item.slug === slug),
        slug,
      );
    for (const [, slug] of article.html.matchAll(/href="\/products\/([^"#?]+)"/g))
      assert.ok(
        products.some((item) => item.slug === slug),
        slug,
      );
    assert.doesNotMatch(
      article.html,
      /href="https?:\/\/(?:www\.)?(?:threeinternational\.com|iii\.earth)\/en\/(?:ShopProducts|aboutus|thescience|our-team|scientific-advisory-board|Donate)/i,
    );
  }
});

test('leadership and scientific board retain every published biography and portrait', () => {
  assert.equal(people.team.length, 7);
  assert.equal(people.board.length, 9);
  for (const person of [...people.team, ...people.board]) {
    assert.ok(person.bio.join(' ').length > 200, person.name);
    assert.ok(existsSync(`public${person.image}`), person.image);
    assert.ok(person.role.length > 0);
  }
});

test('Journal search matches ordinary spelling and surrounding whitespace', () => {
  assert.equal(normalizeSearchText('  Éternel  '), 'eternel');
  assert.ok(
    journal.some((article) =>
      normalizeSearchText(article.title).includes(normalizeSearchText('  eternEL ')),
    ),
  );
});
