'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Play, X } from 'lucide-react';

export function FilmDialog({ title, src }: { title: string; src: string }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="text-link film-trigger">
        <Play size={16} />
        Watch The Film
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="feature-film-dialog">
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description className="sr-only">
            The original THREE film. Use the player controls to start playback.
          </Dialog.Description>
          <Dialog.Close className="icon-button dialog-close" aria-label="Close film">
            <X />
          </Dialog.Close>
          <iframe src={src} title={title} allow="fullscreen; picture-in-picture" allowFullScreen />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
