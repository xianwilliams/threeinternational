import { Plus } from 'lucide-react';
import { faqs } from '@/lib/products';

export function Faq({ items = faqs }: { items?: { question: string; answer: string }[] }) {
  return (
    <div className="faq-list">
      {items.map((item) => (
        <details key={item.question}>
          <summary>
            {item.question}
            <Plus size={20} strokeWidth={1.4} />
          </summary>
          <div className="faq-answer">
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
