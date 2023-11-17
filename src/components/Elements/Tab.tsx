import { Tab as HeadlessUiTab } from '@headlessui/react';
import { FC, PropsWithChildren } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

interface BaseTabProps extends PropsWithChildren {
  className?: string;
}

const BaseTab: FC<BaseTabProps> = ({ children, className }) => {
  return (
    <HeadlessUiTab
      className={twMerge(
        twJoin(
          'cursor-pointer select-none rounded bg-transparent px-2 py-1 text-sm hover:bg-[#f5f5f5] focus:outline-none',
          'ui-selected:font-semibold',
        ),
        className,
      )}
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
