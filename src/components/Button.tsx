import { ButtonHTMLAttributes, FC } from 'react';
import { twMerge } from 'tailwind-merge';

type Variant = 'primary' | 'secondary' | 'danger';

const variantClassnames: Record<Variant, string> = {
  primary:
    'bg-blue-6 text-white border-blue-6 hover:bg-blue-7 disabled:bg-blue-3 disabled:text-white disabled:border-blue-3',
  secondary:
    'bg-white text-blue-6 border-blue-6 hover:bg-#f5f5f5 disabled:bg-white disabled:text-blue-3 disabled:border-blue-3',
  danger:
    'bg-red-5 text-white border-red-5 hover:bg-red-6 disabled:bg-red-3 disabled:text-white disabled:border-red-3',
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
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
      'border-solid border-#ddd rounded bg-white px-2 py-1 font-medium',
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
