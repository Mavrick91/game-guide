import { type ButtonHTMLAttributes, type ReactElement } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../../utils/style';

const buttonVariants = cva(
  'flex items-center justify-center transition-all, duration-200 gap-3 whitespace-nowrap',
  {
    variants: {
      variant: {
        ghost: ['bg-transparent', 'w-full', 'justify-start'],
        black: [
          'text-white',
          'rounded-xl',
          'bg-black',
          'active:bg-[#0A0A0A]',
          'hover:bg-[#141414]',
        ],
      },
      size: {
        small: ['text-sm', 'py-1', 'px-2'],
        medium: ['text-base', 'py-2', 'px-7', 'font-semibold'],
      },
      active: {
        true: ['text-purple-pop'],
        false: ['opacity-50'],
      },
    },
    defaultVariants: {
      variant: 'ghost',
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export default function Button({
  className,
  variant,
  size,
  active,
  ...buttonProps
}: ButtonProps): ReactElement {
  return (
    <button
      {...buttonProps}
      className={cn(buttonVariants({ variant, size, active, className }))}
    />
  );
}
