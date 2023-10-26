import { ReactNode } from 'react';
import { Tab as HeadlessUiTab } from '@headlessui/react';
import { classNames } from '~/shared/lib';

interface Props {
  children: ReactNode;
}

const Tab = ({ children }: Props) => {
  return (
    <HeadlessUiTab
      className={({ selected }) =>
        classNames(
          'bg-transparent py-1 px-2 rounded  select-none  cursor-pointer ',
          selected
            ? 'bshadow-sm hover:bg-#f5f5f5 border-1 border-solid border-#ddd focus:outline-none focus:ring-0'
            : 'border-none',
        )
      }
    >
      {children}
    </HeadlessUiTab>
  );
};

Tab.List = HeadlessUiTab.List;
Tab.Panel = HeadlessUiTab.Panel;
Tab.Group = HeadlessUiTab.Group;
Tab.Panels = HeadlessUiTab.Panels;

export default Tab;
