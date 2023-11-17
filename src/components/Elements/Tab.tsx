import { ReactNode } from 'react';
import { Tab as HeadlessUiTab } from '@headlessui/react';
import { twJoin } from 'tailwind-merge';

interface Props {
  children: ReactNode;
}

const BaseTab = ({ children }: Props) => {
  return (
    <HeadlessUiTab
      className={({ selected }) =>
        twJoin(
          'cursor-pointer select-none rounded bg-transparent px-2 py-1',
          selected
            ? 'border border-solid border-gray-200 shadow-sm hover:bg-[#f5f5f5] focus:outline-none'
            : 'm-[1px]',
        )
      }
    >
      {children}
    </HeadlessUiTab>
  );
};

const Panel = ({ children }: Props) => {
  return <HeadlessUiTab.Panel className="my-6">{children}</HeadlessUiTab.Panel>;
};

export const Tab = Object.assign(BaseTab, {
  List: HeadlessUiTab.List,
  Group: HeadlessUiTab.Group,
  Panels: HeadlessUiTab.Panels,
  Panel,
});
