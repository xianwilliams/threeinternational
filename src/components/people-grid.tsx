'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { ArrowUpRight, X } from 'lucide-react';

type Person = { name: string; role: string; slug: string; image: string; bio: string[] };
export function PeopleGrid({ people }: { people: Person[] }) {
  return (
    <div className="people-grid">
      {people.map((person) => (
        <Dialog.Root key={person.slug}>
          <article className="person-card" id={person.slug} data-reveal>
            <Dialog.Trigger className="person-trigger" aria-label={`Read About ${person.name}`}>
              <div className="person-image">
                <img src={person.image} alt={person.name} width={600} height={700} loading="lazy" />
                <span>
                  <ArrowUpRight size={20} />
                </span>
              </div>
              <h3>{person.name}</h3>
              <p>{person.role}</p>
            </Dialog.Trigger>
          </article>
          <Dialog.Portal>
            <Dialog.Overlay className="dialog-overlay" />
            <Dialog.Content className="person-dialog">
              <Dialog.Close className="dialog-close icon-button" aria-label="Close biography">
                <X />
              </Dialog.Close>
              <div className="person-dialog-portrait">
                <img src={person.image} alt={person.name} width={600} height={800} />
              </div>
              <div className="person-biography">
                <Dialog.Title>{person.name}</Dialog.Title>
                <Dialog.Description>{person.role}</Dialog.Description>
                <div>
                  {person.bio.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      ))}
    </div>
  );
}
