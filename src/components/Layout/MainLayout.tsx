import { Link } from '@tanstack/react-router';
import { FC, PropsWithChildren } from 'react';
import { getTabIndex, tabs } from '~/utils/tabs';
import { Tab } from '..';

export const Logo = () => (
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
          <Tab.List className="flex items-center space-x-2">
            {tabs.map((tab) => (
              <Link to={tab.pathname} key={tab.pathname}>
                <Tab className="flex items-center space-x-1">
                  {tab.icon}
                  <span>{tab.name}</span>
                </Tab>
              </Link>
            ))}
          </Tab.List>
        </div>
        {/* <hr className="my-4" /> */}
        {/* Horizontal rule should bypass padding and apply to full width */}
        <hr className="absolute left-0 right-0 my-2" />
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
