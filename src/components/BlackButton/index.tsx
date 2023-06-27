import { type ButtonHTMLAttributes, type DetailedHTMLProps, type ReactElement, type ReactNode } from 'react'

type BlackButtonProps = {
  children: ReactNode
} & DetailedHTMLProps<
ButtonHTMLAttributes<HTMLButtonElement>,
HTMLButtonElement
>

export default function BlackButton ({
  children,
  ...buttonProps
}: BlackButtonProps): ReactElement {
  return (
    <button
      className="text-base text-white flex items-center py-2 px-7 justify-center rounded-xl bg-black font-poppins font-semibold"
      {...buttonProps}
    >
      {children}
    </button>
  )
}
