import { ButtonHTMLAttributes, FC } from 'react';
import { twMerge } from 'tailwind-merge';

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  disabled,
  ...rest
}) => (
  <button
    className={twMerge(
      'bg-white py-1 px-2 rounded text-#333 border-1 border-solid border-#ddd select-none font-medium  disabled-cursor-not-allowed',
      disabled
        ? 'bg-#f5f5f5 text-#999 border-#ddd'
        : 'hover:bg-#f5f5f5 shadow-sm cursor-pointer',
      className,
    )}
    disabled={disabled}
    {...rest}
  >
    {children}
  </button>
);
