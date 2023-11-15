import { ButtonHTMLAttributes, FC } from 'react';
import { twMerge } from 'tailwind-merge';

const variantClassnames = {
  primary:
    'bg-blue-6 text-white border-blue-6 hover:bg-blue-7 disabled:bg-blue-3 disabled:text-white disabled:border-blue-3',
  secondary:
    'bg-white text-gray-6 border-gray-6 hover:bg-#f5f5f5 disabled:bg-white disabled:text-gray-3 disabled:border-gray-3',
  secondaryDanger:
    'bg-white text-red-6 border-red-6 hover:bg-#fff disabled:bg-white disabled:text-red-3 disabled:border-red-3 border-opacity-50 shadow-sm',
  danger:
    'bg-red-5 text-white border-red-5 hover:bg-red-6 disabled:bg-red-3 disabled:text-white disabled:border-red-3',
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantClassnames;
}

export const Button: FC<Props> = ({
  children,
  className,
  disabled,
  variant = 'primary',
  ...rest
}) => (
  <button
    className={twMerge(
      'border-1 border-solid border-#ddd rounded-1.5 bg-white px-2.5 py-1 font-medium',
      'flex items-center justify-center',
      'disabled:cursor-not-allowed select-none',
      variantClassnames[variant],
      className,
    )}
    disabled={disabled}
    {...rest}
  >
    {children}
  </button>
);
