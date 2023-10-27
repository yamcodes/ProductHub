import { ReactNode, ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
}

export default function Button({ children, className, ...rest }: Props) {
  return (
    <button
      className={
        'bg-white py-1 px-2 rounded text-#333 border-1 border-solid border-#ddd select-none font-bold shadow-sm hover:bg-#f5f5f5 transition-colors duration-200 cursor-pointer' +
        ' ' +
        className
      }
      {...rest}
    >
      {children}
    </button>
  );
}
