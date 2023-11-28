import { Link } from '@tanstack/react-router';
import { FC, PropsWithChildren } from 'react';
import { twJoin } from 'tailwind-merge';
import { Icons } from '@/lib/phosphor';

const Logo = () => (
  <Link
    to="/"
    className={twJoin(
      // Color
      'text-gray-800',
      // Text
      'text-xl font-bold antialiased',
      // Positioning
      'relative top-[-1px] flex items-center space-x-1',
      // Behavior
      'cursor-pointer select-none',
    )}
  >
    <Icons.ShoppingCart
      // gradient
      className="relative top-[2px] text-blue-500"
      size="16"
      weight="fill"
    />
    ProductHub
  </Link>
);

export const Header: FC<PropsWithChildren> = ({ children }) => (
  <div className="flex items-center space-x-4 border-b border-gray-200 bg-white px-8 py-2">
    <Logo />
    {children}
  </div>
);
