import * as React from 'react';
import { type ReactElement } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { NavLink, type NavLinkProps } from 'react-router-dom';

import { cn } from '../../utils/style';

const navlinkVariants = cva(
  'flex items-center gap-3 py-3 px-6 transition-all, duration-200 text-white',
  {
    variants: {
      variant: {
        default: ['bg-[#161616]', 'rounded-xl', 'hover:bg-[#5d4d8a]'],
        ghost: ['bg-transparent', 'hover:bg-[#5d4d8a]', 'rounded-xl'],
      },
      active: {
        true: [
          'bg-[#5d4d8a]',
          'hover:bg-[#5d4d8a]',
          'rounded-xl',
          'bg-opacity-50',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface Props extends NavLinkProps, VariantProps<typeof navlinkVariants> {}

export default function CustomNavLink({
  className,
  variant,
  ...navLinkProps
}: Props): ReactElement {
  return (
    <NavLink
      {...navLinkProps}
      className={({ isActive }) => {
        return cn(
          navlinkVariants({
            variant,
            className,
            active: isActive,
          })
        );
      }}
    />
  );
}
