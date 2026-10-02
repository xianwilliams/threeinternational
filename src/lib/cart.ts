export type PurchasePlan = 'once' | 'subscribe';
export type CartItem = { slug: string; plan: PurchasePlan; quantity: number };
export const cartKey = (item: Pick<CartItem, 'slug' | 'plan'>) => `${item.slug}:${item.plan}`;

export function normalizeCart(value: unknown, validSlugs: string[]): CartItem[] {
  if (!Array.isArray(value)) return [];
  const normalized = new Map<string, CartItem>();
  for (const item of value.slice(0, 100)) {
    if (
      !item ||
      typeof item !== 'object' ||
      !validSlugs.includes(item.slug) ||
      !['once', 'subscribe'].includes(item.plan) ||
      !Number.isFinite(item.quantity)
    )
      continue;
    const quantity = Math.min(20, Math.max(1, Math.floor(item.quantity)));
    const key = cartKey(item);
    normalized.set(key, {
      slug: item.slug,
      plan: item.plan,
      quantity: Math.min(20, quantity + (normalized.get(key)?.quantity ?? 0)),
    });
  }
  return [...normalized.values()];
}

export function addCartItem(items: CartItem[], item: CartItem): CartItem[] {
  const existing = items.find((entry) => cartKey(entry) === cartKey(item));
  if (!existing) return [...items, { ...item, quantity: Math.min(20, Math.max(1, item.quantity)) }];
  return items.map((entry) =>
    cartKey(entry) === cartKey(item)
      ? { ...entry, quantity: Math.min(20, entry.quantity + item.quantity) }
      : entry,
  );
}
