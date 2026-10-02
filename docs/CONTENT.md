# Content Snapshot

Imported October 1, 2026 from THREE's public English website. The original brand typography, logo, product photography, portraits, ingredient photographs, and editorial imagery are retained.

| Original Content                            | Local Route                   |
| ------------------------------------------- | ----------------------------- |
| `/en`                                       | `/`                           |
| `/en/ShopProducts`                          | `/shop`                       |
| 15 current US product detail pages          | `/products/[slug]`            |
| `/en/thescience`                            | `/science`                    |
| `/en/aboutus`                               | `/our-story`                  |
| `/en/Donate`                                | `/love-three`                 |
| `/en/our-team`                              | `/our-team`                   |
| `/en/scientific-advisory-board`             | `/scientific-advisory-board`  |
| `/en/three-farm`                            | `/three-farm`                 |
| `/en/opportunity`                           | `/opportunity`                |
| English THREE blog, all 130 listed articles | `/journal`, `/journal/[slug]` |

Account, payments, recurring donations, and current program terms retain official service links. Legal PDFs and external research citations remain source documents. No account or payment backend is imitated.

The Journal preserves the original article copy, published dates, inline images, and citations. Leading images are displayed once; different first inline images remain in their original positions. Known THREE page, article, and product links are rewritten locally. Legacy Kynetik and Visage URLs are mapped to the corresponding current products. Archived articles retain their original product claims and dates; the editorial snapshot is not a current product-label authority.

`src/lib/people.json` contains all seven leadership biographies and nine active scientific board biographies. `src/lib/journal.json` stores sanitized article content and original source URLs. `docs/source-assets.json` maps every new local photograph to its source URL.

`scripts/source_html.py` is the shared source parser for both importers. `scripts/import-editorial.py` reads the cached `/tmp/three-{team,board}.html`, `/tmp/three-post-list.json`, and `/tmp/three-journal-source/*.html` snapshots. It permits a small static HTML tag list, escapes all text, strips executable elements and styles, and copies only validated links and local image paths. It emits an asset manifest for downloading/optimizing as WebP, up to 1600px. It is an offline import utility, not a runtime fetcher.

Love THREE's original documentary MP4 returned HTTP 403 from its media host. The redesigned page uses its existing photographs with scroll depth, avoiding a broken remote video or extra generation spend. Gift buttons map $5/$25/$50/$100 to original product IDs 3229/3230/3231/3232.

Three new Seedance 2.5 hero generations cost 60 credits each, within the user's 70-credit per-hero ceiling. They were encoded as silent 8-second slow-motion loops. Total conversation spend is 252 of 500 credits, including the earlier 72-credit film. See `higgsfield-usage.json` for job IDs and assets. No other Higgsfield generations were submitted.
