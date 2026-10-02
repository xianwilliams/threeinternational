# THREE consumer experience

A Next.js redesign of THREE’s US shopping experience. It includes a cinematic GLP THREE homepage, a guided product finder, a searchable catalog, 15 product pages, science and brand pages, Love THREE, full team biographies, a 130-article Journal, and a local shopping bag.

Run `npm ci`, then `npm run dev`. Open [localhost:3000](http://localhost:3000). No environment variables or external account are required. Development was checked with Node 26 and Chrome.

The bag saves selections in this browser. It does not submit orders, charge customers, or transfer selections into THREE’s checkout. Purchase links open the corresponding official product pages. [Commerce notes](docs/COMMERCE.md) explain the integration boundary.

## Review the experience

Start on the homepage. Try **Help me choose**, change the wellness focus, and open a product. On GLP THREE, choose Smart Ship, change the quantity, and add it to the bag. Return home and scroll through the floating dropper and interactive science section. Try the same path on a phone. Open **Our Story** to explore the ingredient-to-product animation and its links to the team, farm, and giving pages. On **Love THREE**, switch gift amounts. In **The Journal**, search or filter stories and open a full article.

## Check the code

```sh
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
npm audit --audit-level=high
```

With the preview server running, `npm run check:interactions`, `npm run check:visual`, and `npm run check:editorial` exercise the browser experience and write evidence to `verification/`. They use installed Chrome on macOS. Elsewhere, install Playwright Chromium with `npx playwright install chromium`, or set `CHROME_PATH`. Set `PREVIEW_ORIGIN` to test another local server.

Catalog content is a dated snapshot in `src/lib/catalog.json`, not a live inventory feed. Every product includes its original ID and source URL. Brand photographs, logos, and Altform fonts come from THREE. The current homepage, Story, and Science films use Seedance 2.5, at 60 credits each. Including the earlier film, Higgsfield usage totals 252 of the authorized 500 credits. See [content and media provenance](docs/CONTENT.md).

Read [design decisions and sources](docs/DESIGN.md) and [review notes](docs/REVIEW.md) before publishing. Search indexing is intentionally disabled for this preview.
