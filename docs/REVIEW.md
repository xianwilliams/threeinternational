# Review handoff

Open [the local production preview](http://127.0.0.1:3000). It is running with `npm start`; use `npm run dev` instead when editing. The design brief was authored under the user’s explicit creative delegation and then refined against the supplied audit and Nutrafol reference.

The experience is ready for human review, not publicly deployed. It includes the homepage, shop, science, story, Love THREE, Our Team, the Scientific Advisory Board, THREE Farm, the ambassador page, 130 complete Journal articles, 15 product pages, guided discovery, accessible dialogs, a persistent local bag, and purchase links to the official store.

## Verification results

The final production build passes TypeScript, ESLint, eight unit/regression tests, and 20 browser interaction checks. All 15 product routes and their catalog/gallery image URLs return successfully. All 130 Journal routes also return complete local pages. The dependency audit reports zero vulnerabilities.

Twenty-five route/viewport combinations were checked: the home, shop, GLP THREE, science, story, Love THREE, team, advisory board, farm, ambassador, Journal index, and GLP THREE article pages at 1440px and 390px, plus a 360px reduced-motion homepage. No horizontal overflow, browser runtime errors, or automated WCAG A/AA violations were reported. Search, cart, and finder dialogs were checked separately. Playback, pause, off-screen suspension, and failed-video poster fallback were exercised. Eight editorial pages were additionally checked at 390px with reduced motion. Both the dropper and ingredient convergence were captured at six scroll positions on desktop and mobile, and the film dialog was verified in an 844×390 landscape viewport.

## Visual review

Desktop and phone compositions were inspected as rendered screenshots. The opening has a stable reading column and an independently moving frosted product plate. On mobile, the bottle occupies the upper image plane and the shopping copy resolves below it. Six scroll positions were inspected through the dropper reveal at 1440px and 390px. The real packshot separates into cap, a wider amber-filled pipette, neck, and bottle without rectangular image backgrounds. The lifted cap stays inside its section. Story’s ingredient convergence uses original photographed superfruits and the real Éternel pouch clipped with SVG. Three new headers use eight-second silent playback encodes, with distinct product, morning-ritual, and nature sequences.

The intended curve was clarity → choice → delight → confidence → reassurance → readiness. The rendered journey follows that sequence. The main adjustment after looking was to remove faded body copy, sharpen the product silhouettes, and keep the mobile purchase path close to the content. The bottle reveal remains the largest spatial change. The closing shopping action resolves the page.

`verification/` contains desktop/mobile screenshots, contact sheets, scroll states, accessibility results, and interaction results. Automated accessibility checks supplement, rather than replace, keyboard and visual inspection. A physical iPhone, Safari, Low Power Mode, and real mobile autoplay have not been tested.

## Simplicity review and fixes

A separate review found that the component structure was appropriate. Its practical findings were addressed: search handles ordinary spelling of accented names and ingredients; dialog focus returns to the opener; malformed source lists are normalized; bundle contents follow the product description; and the bag explains the external handoff. Unused button variants and dependencies were removed.

Additional browser review caught a purchase-bar edge case when jumping directly past the options, spacing around mobile line breaks, and screenshots taken during dialog transitions. Regression checks cover the purchase-bar jumps. Browser tests now wait for usable page content and completed focus restoration; they do not depend on Next.js’s speculative prefetch requests becoming idle. Category tabs do not prefetch every category.

## Release dependencies

The current bag is local and does not transfer selections to the official checkout. Live inventory, payments, subscriptions, and ambassador attribution require the authorized integration described in `COMMERCE.md`. No live orders were placed.

The carousel contains real, attributed THREE product reviews. Connecting Google reviews requires the correct Google listing and an approved data source. Do not relabel the current reviews as Google reviews.

Prices and copy are a US catalog snapshot from October 1, 2026. Have the brand review current product claims, label details, prices, and generated header footage before public launch. Preview indexing remains disabled.

Higgsfield usage: three new completed header generations at 60 credits each, below the 70-credit limit for each hero. Total conversation spend is 252 of 500 credits, including the original 72-credit film. All other photographs and branding come from THREE. Love THREE’s original documentary was blocked by its media host, so that page uses source photography with scroll depth.

## Revision Review

A fresh simplicity review found the shared components appropriate. Its findings were addressed: Shop and Our Story dropdowns restore focus on Escape; film dialogs stay inside short landscape viewports and can scroll; Opportunity uses named data fields; Science stores each CTA with its principle. Obsolete styles from the replaced Story and Science layouts were removed.

The Journal import preserves all 130 English articles, including distinct first inline photographs and original source citations. Known brand-page and legacy product links now resolve locally. Gift selection maps directly to the four original donation product IDs. The content and media record is in `CONTENT.md`.

The final rendered feel check matched the revision brief: brighter recognition at home, a clear tactile dropper moment, product convergence on Story, alternating scientific explanations, and a direct giving action on Love THREE. The final refinements moved the phone bottle above the headline and kept the opened desktop dropper within its section. No physical iPhone or Safari session was available. External account, payment, and embedded film-provider behavior require their live services and were not transacted.
