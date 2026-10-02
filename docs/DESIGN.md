# Design decisions and sources

The direction is tactile and direct: real packaging, THREE’s own Altform typography, warm whites, and a deep botanical anchor. The white logo comes from THREE. The dropper lift is the signature interaction. A quiet opening film and compact shopping sections give it room to stand out without long pinned sections or scroll hijacking.

The supplied audit was read from `three-dtc-audit.zip`. It is reference material describing opportunities in the existing site. The implementation follows the user’s request for a Next.js consumer experience and preserves the brand.

| Audit concern                     | Useful comparison                                   | Implemented in THREE                                                                       |
| --------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Unclear first impression          | Nutrafol introduces the desired outcome immediately | Explicit GLP THREE benefit, visible price, and a direct shopping action                    |
| Visitors need help choosing       | Nutrafol offers guided routine discovery            | Five-focus product finder and shopping by goal                                             |
| Weak product hierarchy            | Refero’s Seed reference gives photography priority  | Larger packshots, quieter controls, benefits and both purchase prices                      |
| Confidence before buying          | Nutrafol sequences evidence, experiences, and FAQs  | Source-linked science, real product-review excerpts, and clear supplement FAQs             |
| Purchase options compete visually | Consistent purchase hierarchy                       | One-time/Smart Ship selectors, plain delivery terms, and a persistent purchase bar         |
| Company-first navigation          | Consumer shopping paths lead                        | Shop, science, and product discovery first; ambassador information in secondary navigation |

The guide is a product-discovery tool, not a medical recommendation or diagnostic quiz. No results timeline or clinical statistics were borrowed from a competitor.

## Source record

Reviewed October 1, 2026:

- [THREE home](https://www.threeinternational.com/en), [US catalog](https://www.threeinternational.com/en/ShopProducts), and the 15 product source URLs retained in the catalog data.
- [GLP THREE](https://www.threeinternational.com/en/productdetail/2/3478/US): ingredients, stated benefits, prices, subscription terms, and published product reviews. Reviews were retrieved through the site’s public `getreviewslist` request for item 3478. The snapshot reports 4.78 from 92 reviews. Short excerpts retain their original ratings and dates; reviewer names and purchase verification were not supplied.
- [THREE science](https://www.threeinternational.com/en/thescience): exploration, curation, and cellular absorption.
- [GLP THREE fact sheet](https://threemedia.earth/wp-content/uploads/2026/01/2601_FactSheet-GLPTHREE_v1_ENG_FNL.pdf) and [Return & Refund Policy](https://threemedia.earth/wp-content/uploads/2026/04/ReturnRefundPolicy_LTR_2604_V3.1_EN.pdf).
- [Nutrafol Men](https://nutrafol.com/men/) for decision support and consumer shopping hierarchy.
- [Refero Seed reference](https://styles.refero.design/style/cd723d5a-e7ea-4e4c-a3bb-6cf56e05057a) for photographic composition, compact flow, restrained typography, and frosted surfaces. Refero’s examples are reconstructions, not Seed’s source code.

The audit’s Google-review carousel request remains dependent on an identified Google listing. Current carousel content is clearly attributed to THREE’s product reviews.

## Media and motion

The original six-second Seedance 2.5 header film cost 72 credits (job `7ad4eba1-26bc-4e61-a42c-7501d40d2887`). The requested revision adds three five-second 1080p generations, at 60 credits each, for the homepage, Our Story, and Science. Playback encodes slow them to eight seconds and include complete poster fallbacks. Total usage is 252 of 500 credits. The per-hero 70-credit ceiling was respected. Job records are in `higgsfield-usage.json`.

The film is locally served as an H.264 MP4 with a still poster. It pauses out of view and on hidden tabs. Reduced-motion visitors receive the still without fetching the film. Mobile positions the bottle beneath the copy.

The dropper uses the real product photograph, SVG silhouettes, a drawn glass pipette, and GSAP ScrollTrigger. This is a packaging illustration, not a physiological animation. GSAP is scoped and cleaned up on navigation. The Next.js component lifecycle handles the motion directly; an unused second scroll engine was not added.

The revision keeps the compact product-editorial grammar. Navigation and footer destinations now lead to the redesigned content pages. All headings use title case and navigation uses uppercase. The homepage pipette has a rigid wider amber-filled barrel, clear tapered tip, and realistic movement behind the bottle. Trust icons draw their SVG strokes once on entry. Story adds a scroll composition using original fruit photographs and the real Éternel pouch silhouette. Science alternates full-bleed image and copy. Love THREE combines a full-span photographic opening, giving panel, values, and ways to contribute. Team and advisory profiles use accessible biography dialogs; the Journal has searchable categories and full local articles.
