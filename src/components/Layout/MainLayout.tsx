import { getTabIndex, tabs } from '~/utils/tabs';
import { Tab } from '..';
import { Link } from '@tanstack/react-router';
import { FC, PropsWithChildren } from 'react';

export const Logo: FC = () => (
  <Link
    to="/"
    className="cursor-pointer select-none bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-xl font-bold text-transparent"
  >
    ProductHub
  </Link>
);

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="p-4">
      <Tab.Group selectedIndex={getTabIndex(location.pathname)}>
        <div className="flex items-center space-x-4">
          <Logo />
          <Tab.List>
            {tabs.map((tab) => (
              <Link to={tab.pathname} key={tab.pathname}>
                <Tab>{tab.name}</Tab>
              </Link>
            ))}
          </Tab.List>
        </div>
        {/* <hr className="my-4" /> */}
        {/* Horizontal rule should bypass padding and apply to full width */}
        <hr className="absolute left-0 right-0 my-4" />
        <div className="h-4" />
        <Tab.Panels>
          {tabs.map((tab) => (
            <Tab.Panel key={tab.pathname}>{children}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
