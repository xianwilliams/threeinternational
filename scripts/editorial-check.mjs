import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import AxeBuilder from '@axe-core/playwright';

const origin = process.env.PREVIEW_ORIGIN || 'http://127.0.0.1:3000';
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_PATH || (existsSync(chrome) ? chrome : undefined),
});
const results = [];
await mkdir('verification/editorial', { recursive: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
await context.addInitScript(() => {
  Element.prototype.requestPointerLock = () => {};
  Element.prototype.setPointerCapture = () => {};
});
const articles = JSON.parse(await readFile('src/lib/journal.json', 'utf8'));
const pending = [...articles];
const failures = [];
await Promise.all(
  Array.from({ length: 5 }, async () => {
    while (pending.length) {
      const article = pending.shift();
      const response = await context.request.get(`${origin}/journal/${article.slug}`);
      if (response.status() !== 200 || !(await response.text()).includes('article-prose'))
        failures.push(article.slug);
    }
  }),
);
assert.deepEqual(failures, []);
results.push({
  check: 'Every English Journal article returns a complete local page',
  count: articles.length,
  passed: true,
});

for (const width of [1440, 390]) {
  const page = await context.newPage();
  const height = width === 1440 ? 1000 : 844;
  await page.setViewportSize({ width, height });
  for (const [route, selector, name] of [
    ['/', '.ritual-section', 'dropper'],
    ['/our-story', '.story-formation', 'ingredients'],
  ]) {
    await page.goto(origin + route, { waitUntil: 'load' });
    const box = await page.locator(selector).boundingBox();
    const start = box.y - height * 0.75;
    const end = box.y + box.height - height * 0.65;
    const transforms = [];
    for (let step = 0; step < 6; step++) {
      await page.evaluate(
        (top) => window.scrollTo({ top, behavior: 'instant' }),
        start + ((end - start) * step) / 5,
      );
      await page.waitForTimeout(1000);
      await page.screenshot({ path: `verification/editorial/${name}-${width}-${step}.png` });
      transforms.push(
        await page
          .locator(name === 'dropper' ? '.dropper-assembly' : '.formed-product')
          .evaluate((el) => getComputedStyle(el).transform),
      );
    }
    assert.notEqual(transforms[0], transforms[5]);
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      false,
    );
    results.push({ check: `${name} six scroll states`, width, passed: true });
  }
  await page.close();
}
const phone = await browser.newContext({
  viewport: { width: 390, height: 844 },
  reducedMotion: 'reduce',
  isMobile: true,
  hasTouch: true,
});
const still = await phone.newPage();
for (const route of [
  '/our-story',
  '/science',
  '/love-three',
  '/our-team',
  '/scientific-advisory-board',
  '/three-farm',
  '/opportunity',
  '/journal',
]) {
  await still.goto(origin + route, { waitUntil: 'load' });
  assert.equal(await still.locator('video').count(), 0);
  assert.equal(
    await still.evaluate(() => document.documentElement.scrollWidth > innerWidth),
    false,
  );
  const a11y = await new AxeBuilder({ page: still })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  assert.deepEqual(
    a11y.violations.map((v) => v.id),
    [],
    route,
  );
}
await still.screenshot({ path: 'verification/editorial/journal-reduced-390.png' });
results.push({ check: 'Reduced motion on all eight editorial pages', passed: true });
const landscape = await context.newPage();
await landscape.setViewportSize({ width: 844, height: 390 });
await landscape.route('https://player.vimeo.com/**', (route) => route.abort());
await landscape.goto(origin + '/three-farm', { waitUntil: 'load' });
await landscape.getByRole('button', { name: 'Watch The Film' }).click();
const close = await landscape.getByRole('button', { name: 'Close film' }).boundingBox();
assert.ok(close.y >= 0 && close.y + close.height <= 390);
await landscape.screenshot({ path: 'verification/editorial/film-dialog-landscape.png' });
await landscape.keyboard.press('Escape');
await landscape.waitForFunction(() =>
  document.activeElement?.textContent?.includes('Watch The Film'),
);
results.push({ check: 'Film close control fits in landscape and restores focus', passed: true });
await writeFile('verification/editorial-results.json', JSON.stringify(results, null, 2));
console.log(results);
await browser.close();
