import { ButtonHTMLAttributes, FC } from 'react';
import { twMerge } from 'tailwind-merge';

type Variant = Exclude<Props['variant'], undefined>;
type Color = Exclude<Props['color'], undefined>;

const variantClassnames: Record<Variant, string> = {
  primary:
    'bg-blue-6 text-white border-blue-6 hover:bg-blue-7 disabled:bg-blue-3 disabled:text-white disabled:border-blue-3',
  secondary:
    'bg-white text-gray-6 border-gray-6 hover:bg-grey-50 disabled:bg-white disabled:text-gray-3 disabled:border-gray-3',
};

const colorClassnames: Record<Color, string> = {
  error: 'text-red-6 border-red-6 hover:bg-red-7 disabled:bg-red-3',
  info: 'text-blue-6 border-blue-6 hover:bg-blue-7 disabled:bg-blue-3',
  success: 'text-green-6 border-green-6 hover:bg-green-7 disabled:bg-green-3',
  warning:
    'text-yellow-6 border-yellow-6 hover:bg-yellow-7 disabled:bg-yellow-3',
  default: 'text-gray-6 border-gray-6 hover:bg-grey-50 disabled:bg-gray-3',
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  color?: 'error' | 'info' | 'success' | 'warning' | 'default';
}

export const Button: FC<Props> = ({
  children,
  className,
  disabled,
  variant = 'primary',
  color = 'default',
  ...rest
}) => (
  <button
    className={twMerge(
      'border border-grey rounded-md bg-white px-2.5 py-1 font-medium',
      'flex items-center justify-center',
      'disabled:cursor-not-allowed select-none',
      variantClassnames[variant],
      colorClassnames[color],
      className,
    )}
    disabled={disabled}
    {...rest}
  >
    {children}
  </button>
);
