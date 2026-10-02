import catalog from './catalog.json';

export type Product = (typeof catalog)[number];
export const products: Product[] = catalog;
export const categories = [
  'All products',
  'Weight management',
  'Daily wellness',
  'Healthy aging',
  'Skin & beauty',
  'Natural energy',
  'Bundles',
] as const;
export const getProduct = (slug: string) => products.find((product) => product.slug === slug);
export const money = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
export const storeUrl = 'https://www.threeinternational.com/en/ShopProducts';
export const disclaimer =
  '*These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease.';

export const faqs = [
  {
    question: 'What is GLP THREE?',
    answer:
      'GLP THREE is a dietary supplement designed to support healthy weight management and help curb food cravings.* It combines the MBC-267 peptide complex with botanical extracts, in a small dropper bottle. It is intended to complement balanced nutrition and regular physical activity.',
  },
  {
    question: 'Is GLP THREE a prescription medication?',
    answer:
      'No. GLP THREE is a dietary supplement, not a prescription GLP-1 medication. It is not a replacement for prescribed treatment. Talk with your healthcare professional about whether it is appropriate for you.',
  },
  {
    question: 'What is inside the formula?',
    answer:
      'The formula includes MBC-267 peptides, Panax ginseng extract, saffron extract, and hops extract. MBC-267 is derived from salmon and mushrooms. Review the complete product label, including allergens, before use.',
  },
  {
    question: 'How does Smart Ship work?',
    answer:
      'THREE’s Smart Ship option saves 10% on eligible products and schedules deliveries every 28 days. You can pause, modify, or cancel. Choose your delivery option and confirm current pricing on THREE’s official store.',
  },
  {
    question: 'What if it is not right for me?',
    answer:
      'THREE lists a 30-day money-back guarantee on its product pages. Conditions apply; read the official Return & Refund Policy for eligibility and instructions. For help with your order, contact support@iii.earth.',
  },
];
