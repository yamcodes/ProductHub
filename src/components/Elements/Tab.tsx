import { Tab as HeadlessUiTab } from '@headlessui/react';
import { Link, ToSubOptions } from '@tanstack/react-router';
import { FC, PropsWithChildren, JSX } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

export interface TabType {
  name: string;
  pathname: ToSubOptions['to'];
  icon?: JSX.Element;
}

interface BaseTabProps extends TabType {
  className?: string;
}

const BaseTab: FC<BaseTabProps> = ({ name, icon, className, pathname }) => {
  return (
    <Link to={pathname} key={pathname}>
      <HeadlessUiTab
        className={({ selected }) =>
          twMerge(
            twJoin(
              'relative cursor-pointer select-none rounded bg-transparent px-2 py-1 text-sm hover:bg-gray-100 focus:outline-none',
              'transition duration-100 ease-in-out',

              selected &&
                'font-semibold after:absolute after:bottom-[calc(50%-23px)] after:left-0 after:z-10 after:h-[2px] after:w-[100%] after:rounded after:bg-gradient-to-r after:from-blue-700 after:to-blue-500',
            ),
            className,
          )
        }
      >
        <span className="flex items-center space-x-2">
          {icon}
          <>
            <span
              title={name}
              className="
              after:visibility-hidden after:block after:h-0 after:overflow-hidden after:font-semibold after:content-[attr(title)]
            "
            >
              {name}
            </span>
          </>
        </span>
      </HeadlessUiTab>
    </Link>
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
