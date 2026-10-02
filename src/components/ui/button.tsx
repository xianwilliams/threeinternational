import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes } from 'react';

const buttonVariants = cva('button', {
  variants: {
    variant: {
      primary: 'button-primary',
      light: 'button-light',
      outline: 'button-outline',
    },
  },
  defaultVariants: { variant: 'primary' },
});
type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };
export function Button({ asChild = false, className, variant, ...props }: Props) {
  const Component = asChild ? Slot : 'button';
  return <Component className={buttonVariants({ variant, className })} {...props} />;
}
