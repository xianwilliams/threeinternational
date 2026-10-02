import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import AxeBuilder from '@axe-core/playwright';

const origin = process.env.PREVIEW_ORIGIN || 'http://127.0.0.1:3000';
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_PATH || (existsSync(chrome) ? chrome : undefined),
});
const results = [];
await mkdir('verification', { recursive: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
async function check(name, run) {
  try {
    await run();
    results.push({ name, passed: true });
  } catch (error) {
    results.push({ name, passed: false, error: error.message });
    await page.keyboard.press('Escape');
  }
  console.log(results.at(-1));
}
async function noViolations() {
  await page.waitForTimeout(350);
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  assert.deepEqual(
    result.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
    [],
  );
}
await page.goto(origin, { waitUntil: 'load' });
await check(
  'Search supports plain spelling, ingredients, and restores keyboard focus',
  async () => {
    await page.getByRole('button', { name: 'Search products', exact: true }).click();
    assert.equal(
      await page.getByLabel('Search the catalog').evaluate((el) => el === document.activeElement),
      true,
    );
    await page.getByLabel('Search the catalog').fill('eternel');
    assert.equal(await page.locator('.search-results > a[href="/products/eternel"]').count(), 1);
    assert.match(await page.locator('.search-results').innerText(), /Éternel/);
    await page.getByLabel('Search the catalog').fill('saffron');
    assert.match(await page.locator('.search-results').innerText(), /GLP THREE/);
    await noViolations();
    await page.keyboard.press('Escape');
    await page.waitForFunction(
      () => document.activeElement?.getAttribute('aria-label') === 'Search products',
    );
    assert.equal(
      await page
        .getByRole('button', { name: 'Search products', exact: true })
        .evaluate((el) => el === document.activeElement),
      true,
    );
  },
);
await check('Routine finder changes its product and routes to the chosen formula', async () => {
  await page.getByRole('button', { name: 'Help me choose' }).click();
  await page
    .getByRole('button', { name: 'Natural energy Bring a little lift to your day.' })
    .click();
  assert.match(await page.locator('.routine-result').innerText(), /Kynetik/i);
  await page.waitForTimeout(350);
  await page.screenshot({ path: 'verification/routine-finder-1440.png' });
  await noViolations();
  await page.getByRole('link', { name: 'Explore this formula' }).click();
  await page.waitForURL('**/products/kynetik');
  assert.equal(await page.getByRole('dialog').count(), 0);
});
await page.goto(origin + '/products/glp-three', { waitUntil: 'load' });
await check('Gallery swaps the selected photo', async () => {
  await page.getByRole('button', { name: 'View GLP THREE photo 2' }).click();
  assert.equal(
    await page.getByRole('button', { name: 'View GLP THREE photo 2' }).getAttribute('aria-pressed'),
    'true',
  );
  assert.match(await page.locator('.gallery-main img').getAttribute('src'), /glp-three-1/);
});
await check(
  'Subscription and quantity drive the bag total and persist through reload',
  async () => {
    await page.getByRole('radio').nth(1).check();
    await page.getByRole('button', { name: 'Increase quantity', exact: true }).click();
    const buy = page.locator('.purchase-actions').getByRole('button', { name: /Add to bag/ });
    assert.match(await buy.innerText(), /\$153/);
    await buy.click();
    await page.getByRole('dialog').waitFor();
    assert.equal(await page.locator('.subtotal strong').innerText(), '$153');
    assert.match(await page.locator('.cart-item-info').innerText(), /Smart Ship/);
    assert.match(await page.locator('.cart-footer').innerText(), /do not transfer automatically/);
    await noViolations();
    await page.getByRole('button', { name: 'Close bag', exact: true }).click();
    await page.waitForFunction(() => document.activeElement?.closest('.purchase-actions') !== null);
    await page.reload({ waitUntil: 'load' });
    await page.getByRole('button', { name: 'Open bag, 2 items' }).click();
    assert.equal(await page.locator('.subtotal strong').innerText(), '$153');
    await page.getByRole('button', { name: 'Increase GLP THREE quantity' }).click();
    assert.equal(await page.locator('.subtotal strong').innerText(), '$229.50');
    assert.equal(
      await page.getByRole('link', { name: 'Continue at THREE' }).getAttribute('href'),
      'https://www.threeinternational.com/en/productdetail/2/3478/US',
    );
    await page.getByRole('button', { name: 'Remove', exact: true }).click();
    assert.match(await page.getByRole('dialog').innerText(), /Your Next Ritual Starts Here/i);
    await page.keyboard.press('Escape');
  },
);
await check('Product purchase bar appears below options and opens the bag', async () => {
  await page.locator('#ingredients').scrollIntoViewIfNeeded();
  await page.locator('.quick-buy').waitFor();
  await page.screenshot({ path: 'verification/product-quick-buy.png' });
  await page.locator('.quick-buy').getByRole('button').click();
  await page.getByRole('dialog').waitFor();
  assert.equal(await page.locator('.subtotal strong').innerText(), '$85');
  await page.keyboard.press('Escape');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(350);
  assert.equal(await page.locator('.quick-buy').count(), 0);
  await page.locator('#ingredients').scrollIntoViewIfNeeded();
  await page.locator('.quick-buy').waitFor();
});
await page.goto(origin + '/shop', { waitUntil: 'load' });
await check('Shop filters, sorting, and empty results work', async () => {
  assert.equal(await page.locator('.catalog-grid .product-card').count(), 15);
  await page.getByLabel('Sort products').selectOption('price-asc');
  assert.match(
    await page.locator('.catalog-grid .product-card').first().innerText(),
    /Radiant Toner/,
  );
  await page.getByLabel('Filter products').fill('vitalite');
  assert.equal(
    await page.locator('.catalog-grid .product-card-title[href="/products/vitalite"]').count(),
    1,
  );
  await page.getByLabel('Filter products').fill('no such product');
  assert.match(await page.locator('.catalog-empty').innerText(), /A Fresh Search/i);
  await page.getByRole('button', { name: 'Clear product search' }).click();
  await page
    .getByRole('navigation', { name: 'Product categories' })
    .getByRole('link', { name: 'Skin & beauty', exact: true })
    .click();
  await page.waitForURL('**/shop?category=Skin%20%26%20beauty#collection');
  assert.equal(await page.locator('.catalog-grid .product-card').count(), 5);
});
await page.goto(origin, { waitUntil: 'load' });
await check('Science tabs support keyboard navigation and FAQ disclosures open', async () => {
  const tab = page.getByRole('tab', { name: 'Absorption' });
  await tab.focus();
  await page.keyboard.press('ArrowRight');
  assert.equal(
    await page.getByRole('tab', { name: 'Exploration' }).getAttribute('aria-selected'),
    'true',
  );
  assert.match(await page.getByRole('tabpanel').innerText(), /Nature Starts/i);
  await page
    .locator('summary')
    .filter({ hasText: 'Is GLP THREE a prescription medication?' })
    .click();
  assert.match(
    await page.locator('details[open]').innerText(),
    /not a prescription GLP-1 medication/,
  );
});
await check('Scroll changes the dropper and pointer changes the foreground plane', async () => {
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(1000);
  const before = await page
    .locator('.dropper-assembly')
    .evaluate((el) => getComputedStyle(el).transform);
  await page.mouse.move(1150, 350);
  const pointer = await page
    .locator('.hero')
    .evaluate((el) => el.style.getPropertyValue('--pointer-x'));
  assert.notEqual(pointer, '0px');
  await page
    .locator('.ritual-section')
    .evaluate((el) => window.scrollTo({ top: el.offsetTop + 200, behavior: 'instant' }));
  await page.waitForTimeout(1200);
  const after = await page
    .locator('.dropper-assembly')
    .evaluate((el) => getComputedStyle(el).transform);
  assert.notEqual(before, after);
});
const catalog = JSON.parse(await readFile('src/lib/catalog.json', 'utf8'));
await check('All 15 product pages return valid product content', async () => {
  for (const product of catalog) {
    const response = await page.request.get(origin + '/products/' + product.slug);
    assert.equal(response.status(), 200, product.slug);
    assert.ok((await response.text()).includes(product.name), product.slug);
  }
  const images = [...new Set(catalog.flatMap((product) => [product.image, ...product.gallery]))];
  for (const image of images) {
    assert.equal((await page.request.get(origin + image)).status(), 200, image);
  }
});
await check('Header film plays, pauses on demand, and stops outside the viewport', async () => {
  await page.goto(origin, { waitUntil: 'load' });
  await page.waitForFunction(() => document.querySelector('video')?.readyState >= 2);
  const time = await page.locator('video').evaluate((video) => video.currentTime);
  await page.waitForTimeout(350);
  assert.notEqual(await page.locator('video').evaluate((video) => video.currentTime), time);
  await page.getByRole('button', { name: 'Pause header film' }).click();
  assert.equal(await page.locator('video').evaluate((video) => video.paused), true);
  await page.getByRole('button', { name: 'Play header film' }).click();
  await page.locator('.reviews-section').scrollIntoViewIfNeeded();
  await page.waitForTimeout(250);
  assert.equal(await page.locator('video').evaluate((video) => video.paused), true);
});
await check(
  'Public navigation stays in the redesigned site and uses uppercase styling',
  async () => {
    await page.goto(origin, { waitUntil: 'load' });
    const nav = page.getByRole('navigation', { name: 'Main navigation' });
    assert.equal(
      await nav.getByRole('link', { name: /the journal/i }).getAttribute('href'),
      '/journal',
    );
    await nav.getByRole('button', { name: /our story/i }).click();
    assert.equal(
      await page
        .locator('#about-menu')
        .getByRole('link', { name: 'Our Team', exact: true })
        .getAttribute('href'),
      '/our-team',
    );
    assert.equal(await nav.evaluate((el) => getComputedStyle(el).textTransform), 'uppercase');
    await page.locator('#about-menu a').first().focus();
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#about-menu').count(), 0);
    assert.equal(
      await nav
        .getByRole('button', { name: /our story/i })
        .evaluate((el) => el === document.activeElement),
      true,
    );
  },
);
await check('Donation selection matches each official gift amount', async () => {
  await page.goto(origin + '/love-three', { waitUntil: 'load' });
  for (const [amount, id] of [
    [5, 3229],
    [25, 3230],
    [50, 3231],
    [100, 3232],
  ]) {
    await page
      .locator('.donation-amounts')
      .getByRole('button', { name: `$${amount}`, exact: true })
      .click();
    assert.equal(
      await page.getByRole('link', { name: `Give $${amount}`, exact: true }).getAttribute('href'),
      `https://www.threeinternational.com/en/productdetail/2/${id}/US`,
    );
  }
  assert.equal(await page.locator('.donation-amounts [aria-pressed="true"]').count(), 1);
  await noViolations();
});
await check('Leadership biographies open completely and restore focus', async () => {
  await page.goto(origin + '/our-team', { waitUntil: 'load' });
  const opener = page.getByRole('button', { name: 'Read About Daniel Picou', exact: true });
  await opener.click();
  const dialog = page.getByRole('dialog');
  assert.ok((await dialog.innerText()).includes('2023'));
  await noViolations();
  await page.keyboard.press('Escape');
  await page.waitForFunction(
    () => document.activeElement?.getAttribute('aria-label') === 'Read About Daniel Picou',
  );
});
await check('Journal search, categories, pagination, and article links work locally', async () => {
  await page.goto(origin + '/journal', { waitUntil: 'load' });
  assert.equal(await page.locator('.journal-library .journal-card').count(), 12);
  await page.getByRole('button', { name: /more stories/i }).click();
  assert.equal(await page.locator('.journal-library .journal-card').count(), 24);
  await page.getByLabel('Search the journal').fill('GLP THREE');
  assert.ok((await page.locator('.journal-result-count').innerText()).includes('GLP THREE'));
  const href = await page.locator('.journal-library .journal-card a').first().getAttribute('href');
  assert.ok(href.startsWith('/journal/'));
  await page.locator('.journal-library .journal-card a').first().click();
  await page.waitForURL(origin + href);
  assert.ok((await page.locator('.article-prose').innerText()).length > 500);
  await page.goto(origin + '/journal', { waitUntil: 'load' });
  await page.getByRole('button', { name: 'Skin & Beauty', exact: true }).click();
  assert.ok(
    (await page.locator('.journal-library .article-meta').allInnerTexts()).every((text) =>
      text.toLowerCase().includes('skin & beauty'),
    ),
  );
  await page.getByLabel('Search the journal').fill('zzzzmissing');
  assert.equal(await page.locator('.journal-card').count(), 0);
  assert.equal(await page.getByRole('button', { name: 'See All Stories' }).count(), 1);
});
await check('Science and Story films play, pause, and suspend off screen', async () => {
  for (const route of ['/our-story', '/science']) {
    await page.goto(origin + route, { waitUntil: 'load' });
    await page.waitForFunction(() => document.querySelector('video')?.readyState >= 2);
    await page.getByRole('button', { name: 'Pause header film' }).click();
    assert.equal(await page.locator('video').evaluate((video) => video.paused), true);
    await page.getByRole('button', { name: 'Play header film' }).click();
    await page.locator('.site-footer').scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    assert.equal(await page.locator('video').evaluate((video) => video.paused), true);
  }
});
await check(
  'Trust icons draw on entry and the dropper has realistic wider proportions',
  async () => {
    await page.setViewportSize({ width: 1440, height: 600 });
    await page.goto(origin, { waitUntil: 'load' });
    const strokes = page.locator('.trust-strip svg path');
    assert.ok(
      await strokes.evaluateAll((paths) =>
        paths.some((path) => parseFloat(getComputedStyle(path).strokeDashoffset) > 0),
      ),
    );
    await page.locator('.trust-strip').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1600);
    assert.ok(
      await strokes.evaluateAll((paths) =>
        paths.every((path) => parseFloat(getComputedStyle(path).strokeDashoffset) === 0),
      ),
    );
    const ratio = await page
      .locator('.pipette')
      .evaluate((el) => el.clientWidth / el.parentElement.clientWidth);
    assert.ok(ratio >= 0.05 && ratio <= 0.09);
    await page.setViewportSize({ width: 1440, height: 1000 });
  },
);
await context.close();
const mobile = await browser.newContext({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
  reducedMotion: 'reduce',
});
const phone = await mobile.newPage();
await phone.goto(origin, { waitUntil: 'load' });
await check('Reduced motion keeps a still hero and mobile navigation works', async () => {
  assert.equal(await phone.locator('.hero video').count(), 0);
  await phone.getByRole('button', { name: 'Open menu', exact: true }).click();
  await phone
    .getByRole('navigation', { name: 'Mobile navigation' })
    .getByRole('link', { name: 'The science', exact: true })
    .click();
  await phone.waitForURL('**/science');
  assert.equal(await phone.getByRole('dialog').count(), 0);
  assert.equal(
    await phone.evaluate(() => document.documentElement.scrollWidth > innerWidth),
    false,
  );
});
await phone.goto(origin, { waitUntil: 'load' });
await check('Routine finder fits on a touch viewport', async () => {
  await phone.getByRole('button', { name: 'Help me choose' }).click();
  await phone.getByRole('button', { name: /^Daily wellness/ }).click();
  await phone.waitForTimeout(350);
  await phone.screenshot({ path: 'verification/routine-finder-390.png' });
  assert.match(await phone.locator('.routine-result').innerText(), /Vitalité/);
  assert.equal(
    await phone.locator('.routine-dialog').evaluate((el) => el.scrollWidth > el.clientWidth),
    false,
  );
  const a11y = await new AxeBuilder({ page: phone })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  assert.deepEqual(
    a11y.violations.map((v) => v.id),
    [],
  );
});
results.push({ name: 'No browser runtime errors', passed: errors.length === 0, errors });
const fallback = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
await fallback.route('**/video/**', (route) => route.abort());
const still = await fallback.newPage();
await check('A failed video request leaves the complete still hero visible', async () => {
  await still.goto(origin, { waitUntil: 'load' });
  assert.equal(
    await still
      .locator('.hero-poster')
      .evaluate((image) => image.complete && image.naturalWidth > 0),
    true,
  );
  assert.equal(
    await still.locator('.hero-video').evaluate((video) => getComputedStyle(video).opacity),
    '0',
  );
  await still.screenshot({ path: 'verification/hero-video-fallback.png' });
});
await writeFile('verification/interaction-results.json', JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
await browser.close();
if (results.some((r) => !r.passed)) process.exitCode = 1;
