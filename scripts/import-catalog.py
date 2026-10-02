"""Import public THREE product snapshots downloaded to /tmp/three-product-{id}.html."""
from pathlib import Path
from urllib.parse import urljoin
from source_html import Document, Element
import json
import re


settings = {
    '3478': ('glp-three', 'GLP THREE', 'Weight management', 'A little bottle. A new beginning.', 'glp-three-dietary-supplement.webp'),
    '2802': ('vitalite', 'Vitalité', 'Daily wellness', 'Your daily foundation.', 'vitalite-omega-3-daily-multivitamin.webp'),
    '2797': ('eternel', 'Éternel', 'Healthy aging', 'Wellness for the long run.', 'eternel-antioxidant-resveratrol-coq10-supplement.webp'),
    '2798': ('collagene', 'Collagène', 'Skin & beauty', 'Beauty, from within.', 'collagene-marine-collagen-supplement.webp'),
    '3516': ('kynetik', 'Kynetik', 'Natural energy', 'A brighter kind of energy.', 'kynetik-clean-caffeine-natural-energy-drink.webp'),
    '2799': ('revive', 'Revíve', 'Daily wellness', 'Keep doing what moves you.', 'revive-muscle-recovery-joint-support-supplement.webp'),
    '2801': ('purifi', 'Purifí', 'Daily wellness', 'A fresh start from within.', 'purifi-cellular-detox-cleanse-supplement.webp'),
    '2803': ('imune', 'Imúne', 'Daily wellness', 'Support for every season.', 'imune-immune-support-supplement.webp'),
    '3041': ('visage-super-serum', 'Visage Super Serum', 'Skin & beauty', 'A little more radiance.', 'visage-super-serum-vitamin-c-hyaluronic-acid-serum.webp'),
    '3136': ('visage-creme-caviar', 'Visage Crème Caviar', 'Skin & beauty', 'Let your skin drink it in.', 'visage-creme-caviar-hydrating-face-moisturizer.webp'),
    '3092': ('pure-cleanse', 'Pure Cleanse', 'Skin & beauty', 'Start beautifully.', 'pure-cleanse-gentle-hydrating-facial-cleanser.webp'),
    '3093': ('radiant-toner', 'Radiant Toner', 'Skin & beauty', 'Make room for radiance.', 'radiant-toner-hydrating-vitamin-c-toner.webp'),
    '3581': ('glp-three-four-pack', 'GLP THREE 4 Pack', 'Bundles', 'Make it your daily ritual.', 'glp-three-four-pack-appetite-support-supplement-330x330.webp'),
    '3144': ('visage-collection', 'The Visage Collection', 'Bundles', 'Your complete skin ritual.', 'visage-skincare-collection-cleanser-toner-serum-moisturizer-330x330.webp'),
    '3622': ('impact-pack', 'Impact Pack', 'Bundles', 'Better together.', 'three-impact-pack-wellness-supplement-bundle-330x330.webp'),
}
products = []
assets = {}
for product_id, (slug, name, category, headline, image) in settings.items():
    source = Path(f'/tmp/three-product-{product_id}.html').read_text()
    doc = Document(source)
    intro = doc.by_id('item-desc')
    tagline = next(iter(intro.find(lambda e: e.tag == 'span')), Element()).text()
    description = next(iter(doc.by_id('short-desc-desktop').find(lambda e: e.tag == 'p')), Element()).text()
    benefits = [e.text() for e in doc.by_id('key-benefits-content').find(lambda e: e.tag == 'li')]
    ingredients = [e.text() for e in doc.by_id('ingridients-content').find(lambda e: e.tag == 'li')]
    prices = re.search(r'One-time purchase[\s\S]*?<strong>\s*\$([\d,.]+)', source)
    subscription = re.search(r'>Smart Ship<[^$]*?\$[\d,.]+[\s\S]*?<strong>\$([\d,.]+)', source)
    gallery_urls = list(dict.fromkeys(e.attrs.get('src') for e in doc.root.find(lambda e: e.tag == 'img' and '/shopping/product' in e.attrs.get('src', ''))))[:3]
    gallery = []
    for index, url in enumerate(gallery_urls):
        filename = f'{slug}-{index}' + Path(url).suffix.lower()
        assets[filename] = urljoin('https://www.threeinternational.com', url)
        gallery.append('/images/' + filename)
    if product_id == '3622':
        ingredients = ['Revíve', 'GLP THREE™', 'Purifí', 'Kynetik Clean Caffeine Berry Blast']
    if product_id == '3478':
        tagline = 'Daily support for weight management and food cravings*'
    elif product_id == '3581':
        tagline = 'Your GLP THREE routine, four bottles at a time'
    products.append({
        'id': product_id, 'slug': slug, 'name': name, 'category': category, 'headline': headline,
        'tagline': tagline, 'description': description, 'benefits': benefits, 'ingredients': ingredients,
        'price': float(prices[1].replace(',', '')) if prices else None,
        'subscriptionPrice': float(subscription[1].replace(',', '')) if subscription else None,
        'image': '/images/' + image, 'gallery': gallery,
        'sourceUrl': f'https://www.threeinternational.com/en/productdetail/2/{product_id}/US',
    })
Path('src/lib').mkdir(parents=True, exist_ok=True)
Path('src/lib/catalog.json').write_text(json.dumps(products, indent=2, ensure_ascii=False))
Path('/tmp/three-gallery-assets.json').write_text(json.dumps(assets))
print(json.dumps([{k:p[k] for k in ['name','price','subscriptionPrice']} for p in products], indent=2))
