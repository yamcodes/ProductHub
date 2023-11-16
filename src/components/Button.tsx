import { ComponentProps, FC, JSX } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

type Variant = Exclude<Props['variant'], undefined>;
type Color = Exclude<Props['color'], undefined>;

const baseClassnames = twJoin(
  'rounded-md border px-3.5 py-1',
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
    success: 'bg-success-600 hover:bg-success-500 disabled:bg-success',
    warning: 'bg-warning hover:bg-warning-400 disabled:bg-warning',
    default: 'bg-default-900 hover:bg-default-700 disabled:bg-default-300',
  },
  secondary: {
    danger:
      'text-danger-600 border-danger-300 hover:bg-danger-100 disabled:bg-danger',
    info: 'text-info-600 border-info-300 hover:bg-info-100 disabled:bg-info',
    success:
      'text-success-600 border-success-300 hover:bg-success-100 disabled:bg-success',
    warning:
      'text-warning-600 border-warning-300 hover:bg-warning-100 disabled:bg-warning',
    default:
      'text-default-900 border-default-300 hover:bg-default-100 disabled:bg-default-300',
  },
};

interface Props extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary';
  color?: 'danger' | 'info' | 'success' | 'warning' | 'default';
  icon?: JSX.Element;
}

export const Button: FC<Props> = ({
  children,
  className,
  disabled,
  variant = 'primary',
  color = 'default',
  icon,
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
    {icon && <span className="mr-2">{icon}</span>}
    {children}
  </button>
);
