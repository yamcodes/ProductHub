import { Tab as HeadlessUiTab } from '@headlessui/react';
import { FC, PropsWithChildren } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

interface BaseTabProps extends PropsWithChildren {
  className?: string;
}

const BaseTab: FC<BaseTabProps> = ({ children, className }) => {
  return (
    <HeadlessUiTab
      className={({ selected }) =>
        twMerge(
          twJoin(
            'relative cursor-pointer select-none rounded bg-transparent px-2 py-1 text-sm hover:bg-gray-100 focus:outline-none',
            'transition duration-100 ease-in-out',
            // GitHub-like line below the selected tab
            selected &&
              'font-semibold after:absolute after:bottom-[calc(50%-27px)] after:left-0 after:z-10 after:h-[2px] after:w-[100%] after:rounded after:bg-gradient-to-r after:from-purple-500 after:to-pink-400',
          ),
          className,
        )
      }
    >
      {children}
    </HeadlessUiTab>
  );
};

const Panel: FC<PropsWithChildren> = ({ children }) => {
  return <HeadlessUiTab.Panel className="my-6">{children}</HeadlessUiTab.Panel>;
};

export const Tab = Object.assign(BaseTab, {
  List: HeadlessUiTab.List,
  Group: HeadlessUiTab.Group,
  Panels: HeadlessUiTab.Panels,
  Panel,
});
