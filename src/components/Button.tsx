import { ComponentProps, FC } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

type Variant = Exclude<Props['variant'], undefined>;
type Color = Exclude<Props['color'], undefined>;

const baseClassnames = twJoin(
  'rounded-md border px-2.5 py-1',
  'text-sm font-medium',
  'flex items-center justify-center',
  'select-none disabled:cursor-not-allowed',
);

const baseVariantClassnames: Record<Variant, string> = {
  primary: 'text-white border-transparent',
  secondary: 'bg-white shadow-sm',
};

const variantColorClassnames: Record<Variant, Record<Color, string>> = {
  primary: {
    danger: 'bg-danger hover:bg-danger-400 disabled:bg-danger',
    info: 'bg-info hover:bg-info-400 disabled:bg-info',
    success: 'bg-success hover:bg-success-400 disabled:bg-success',
    warning: 'bg-warning hover:bg-warning-400 disabled:bg-warning',
    default: 'bg-default hover:bg-default-400 disabled:bg-default',
  },
  secondary: {
    danger:
      'text-danger border-danger-300 hover:bg-danger-100 disabled:bg-danger',
    info: 'text-info border-info-300 hover:bg-info-100 disabled:bg-info',
    success:
      'text-success border-success-300 hover:bg-success-100 disabled:bg-success',
    warning:
      'text-warning border-warning-300 hover:bg-warning-100 disabled:bg-warning',
    default:
      'text-default border-default-300 hover:bg-default-100 disabled:bg-default',
  },
};

interface Props extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary';
  color?: 'danger' | 'info' | 'success' | 'warning' | 'default';
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
      baseClassnames,
      baseVariantClassnames[variant],
      variantColorClassnames[variant][color],
      disabled && 'opacity-50',
      className,
    )}
    disabled={disabled}
    {...rest}
  >
    {children}
  </button>
);
