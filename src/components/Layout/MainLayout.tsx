import { getTabIndex, tabs } from '~/utils/tabs';
import { Tab } from '..';
import { Link } from '@tanstack/react-router';
import { FC, PropsWithChildren } from 'react';

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="p-4">
      <Tab.Group selectedIndex={getTabIndex(location.pathname)}>
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="cursor-pointer select-none bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-xl font-bold text-transparent"
          >
            ProductHub
          </Link>
          <Tab.List>
            {tabs.map((tab) => (
              <Link to={tab.pathname} key={tab.pathname}>
                <Tab>{tab.name}</Tab>
              </Link>
            ))}
          </Tab.List>
        </div>
        <Tab.Panels>
          {tabs.map((tab) => (
            <Tab.Panel key={tab.pathname}>{children}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
