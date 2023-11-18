import { Tab as HeadlessUiTab } from '@headlessui/react';
import { FC, PropsWithChildren, JSX } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

interface BaseTabProps {
  className?: string;
  text: string;
  icon?: JSX.Element;
}

const BaseTab: FC<BaseTabProps> = ({ text, icon, className }) => {
  return (
    <HeadlessUiTab
      className={({ selected }) =>
        twMerge(
          twJoin(
            'relative cursor-pointer select-none rounded bg-transparent px-2 py-1 text-sm hover:bg-gray-100 focus:outline-none',
            'transition duration-100 ease-in-out',
            // GitHub-like line below the selected tab
            selected &&
              'font-semibold after:absolute after:bottom-[calc(50%-27px)] after:left-0 after:z-10 after:h-[2px] after:w-[100%] after:rounded after:bg-gradient-to-r after:from-red-700 after:to-red-500',
          ),
          className,
        )
      }
    >
      <span className="flex items-center space-x-2">
        {icon}
        <>
          <span>{text}</span>
          {/* TODO: Add an invisible semibold text here, so that when the tab switches from normal to semibold, the width doesn't change */}
          {/* Or alternatively think of a way to make the width not change when the tab switches from normal to semibold */}
          {/* Take note from GitHub repos */}
        </>
      </span>
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
