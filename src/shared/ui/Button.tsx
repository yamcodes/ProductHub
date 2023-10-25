import { ReactNode, ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
}

export default function Button({ children, ...rest }: Props) {
  return (
    <button
      {...rest}
      className="bg-white py-2.5 px-4 rounded text-#1d1d1d border-1 border-solid border-#bbb select-none font-bold shadow-sm hover:bg-#f5f5f5 transition-colors duration-200 m-2 cursor-pointer
      "
    >
      {children}
    </button>
  );
}
