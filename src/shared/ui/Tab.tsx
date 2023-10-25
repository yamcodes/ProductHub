import { ReactNode, ButtonHTMLAttributes } from 'react';
import { Tab as HeadlessUiTab } from '@headlessui/react';

interface Props extends HeadlessUiTab {
  className?: string;
  children: ReactNode;
}

export default function Tab({ children, ...rest }: Props) {
  return (
    <HeadlessUiTab
      {...rest}
      className="bg-white py-1 px-2 rounded text-#333 border-1 border-solid border-#ddd select-none font-bold shadow-sm hover:bg-#f5f5f5 transition-colors duration-200 cursor-pointer
      "
    >
      {children}
    </HeadlessUiTab>
  );
}
