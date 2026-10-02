import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import AxeBuilder from '@axe-core/playwright';

const origin = process.env.PREVIEW_ORIGIN || 'http://127.0.0.1:3000';
const output = 'verification';
await mkdir(output, { recursive: true });
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_PATH || (existsSync(chrome) ? chrome : undefined),
  args: ['--disable-gpu'],
});
const results = [];
async function visit(page, route) {
  await page.goto(origin + route, { waitUntil: 'load' });
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 650) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y);
    await page.waitForTimeout(90);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(1100);
}
for (const viewport of [
  { width: 1440, height: 1000 },
  { width: 390, height: 844 },
  { width: 360, height: 640 },
]) {
  const context = await browser.newContext({
    viewport,
    reducedMotion: viewport.width === 360 ? 'reduce' : 'no-preference',
  });
  await context.addInitScript(() => {
    Element.prototype.requestPointerLock = () => {};
    Element.prototype.setPointerCapture = () => {};
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await visit(page, '/');
  await page.screenshot({ path: `${output}/home-${viewport.width}.png`, fullPage: true });
  await page.screenshot({ path: `${output}/hero-${viewport.width}.png` });
  if (viewport.width !== 360) {
    for (const selector of ['.ritual-section', '.science-section', '.reviews-section']) {
      await page.locator(selector).scrollIntoViewIfNeeded();
      await page.waitForTimeout(700);
      await page.screenshot({ path: `${output}/${selector.slice(1)}-${viewport.width}.png` });
    }
  }
  const accessibility = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  results.push({
    viewport,
    errors,
    overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
    brokenImages: await page
      .locator('img')
      .evaluateAll((images) =>
        images
          .filter((image) => !image.complete || image.naturalWidth === 0)
          .map((image) => image.src),
      ),
    violations: accessibility.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
    })),
  });
  if (viewport.width !== 360)
    for (const route of [
      '/shop',
      '/products/glp-three',
      '/science',
      '/our-story',
      '/love-three',
      '/our-team',
      '/scientific-advisory-board',
      '/three-farm',
      '/opportunity',
      '/journal',
      '/journal/glp-three-a-natural-approach-to-glp-1-support',
    ]) {
      await visit(page, route);
      await page.screenshot({
        path: `${output}/${route.replaceAll('/', '-').slice(1)}-${viewport.width}.png`,
        fullPage: true,
      });
      const a11y = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      results.push({
        viewport,
        route,
        errors: [...errors],
        overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
        violations: a11y.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
        })),
      });
    }
  await context.close();
}
const failed = results.some(
  (result) =>
    result.errors.length ||
    result.overflow ||
    result.violations.length ||
    result.brokenImages?.length,
);
await writeFile(`${output}/visual-results.json`, JSON.stringify(results, null, 2));
console.log(
  JSON.stringify(
    results.map(({ viewport, route, errors, overflow, brokenImages, violations }) => ({
      width: viewport.width,
      route: route ?? '/',
      errors,
      overflow,
      brokenImages,
      violations: violations.length,
    })),
    null,
    2,
  ),
);
await browser.close();
if (failed) process.exitCode = 1;
