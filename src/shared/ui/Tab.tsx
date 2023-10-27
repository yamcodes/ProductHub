import { ReactNode } from 'react';
import { Tab as HeadlessUiTab } from '@headlessui/react';
import clsx from 'clsx';

interface Props {
  children: ReactNode;
}

const Tab = ({ children }: Props) => {
  return (
    <HeadlessUiTab
      className={({ selected }) =>
        clsx(
          'bg-transparent px-2 py-1 rounded select-none cursor-pointer',
          selected
            ? 'bshadow-sm hover:bg-#f5f5f5 border-1 border-solid border-#ddd focus:outline-none'
            : 'm-1px',
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

Tab.List = HeadlessUiTab.List;
Tab.Panel = Panel;
Tab.Group = HeadlessUiTab.Group;
Tab.Panels = HeadlessUiTab.Panels;

export default Tab;
