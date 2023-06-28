import { cva, type VariantProps } from 'class-variance-authority'
import { type ButtonHTMLAttributes, type ReactElement } from 'react'
import { cn } from '../../utils/style'

const buttonVariants = cva('flex items-center justify-center font-poppins transition-all, duration-200', {
  variants: {
    variant: {
      ghost: ['bg-transparent'],
      black: ['text-white', 'rounded-xl', 'bg-black', 'active:bg-[#0A0A0A]', 'hover:bg-[#141414]']
    },
    size: {
      small: ['text-sm', 'py-1', 'px-2'],
      medium: ['text-base', 'py-2', 'px-7', 'font-semibold']
    }
  },
  defaultVariants: {
    variant: 'ghost'
  }
})

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {}

export default function BlackButton({
  className,
  variant,
  size,
  ...buttonProps
}: ButtonProps): ReactElement {
  return (
    <button
      {...buttonProps}
      className={cn(buttonVariants({ variant, size, className }))}
    />
  )
}
