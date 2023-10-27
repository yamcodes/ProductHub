import { ReactNode, ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
}

export default function Button({ children, className, ...rest }: Props) {
  return (
    <button
      className={twMerge(
        'bg-white py-1 px-2 rounded text-#333 border-1 border-solid border-#ddd select-none font-medium shadow-sm hover:bg-#f5f5f5 cursor-pointer',
        ' ',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
