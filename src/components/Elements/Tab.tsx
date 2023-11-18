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

            selected &&
              'after:absolute after:bottom-[calc(50%-23px)] after:left-0 after:z-10 after:h-[2px] after:w-[100%] after:rounded after:bg-gradient-to-r after:from-red-700 after:to-red-500',
            selected ? 'font-semibold' : 'font-normal',
          ),
          className,
        )
      }
    >
      <span className="inline-flex items-center space-x-2">
        {icon && <span className="tab-icon">{icon}</span>}
        <>
          <span
            className="tab-text overflow-hidden truncate whitespace-nowrap"
            style={{ maxWidth: '150px' }}
          >
            <span
              title={text}
              className="
              after:visibility-hidden after:block after:h-0 after:overflow-hidden after:font-semibold after:content-[attr(title)]
            "
            >
              {text}
            </span>
          </span>
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
