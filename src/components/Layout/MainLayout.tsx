import { Link } from '@tanstack/react-router';
import { FC, PropsWithChildren } from 'react';
import { getTabIndex, tabs } from '~/utils/tabs';
import { Icon, Tab } from '..';
import { twJoin } from 'tailwind-merge';

export const Logo = () => (
  <Link
    to="/"
    className={twJoin(
      // Color
      'text-gray-800',
      // Text
      'text-xl font-bold text-transparent antialiased',
      // Positioning
      'relative top-[-1px] flex items-center space-x-1',
      // Behavior
      'cursor-pointer select-none',
    )}
  >
    <Icon.DiceFive
      // gradient
      className="relative top-[1px] text-red-600"
      size="18"
      weight="fill"
    />
    scorepion
  </Link>
);

export const Header: FC<PropsWithChildren> = ({ children }) => (
  <div className="flex items-center space-x-4 border-b border-gray-200 bg-white px-8 pb-3 pt-4">
    <Logo />
    {children}
  </div>
);

export const Content: FC<PropsWithChildren> = ({ children }) => (
  <div className="px-8 py-3.5">{children}</div>
);

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    // <div className="px-8 py-3.5"
    <div>
      <Tab.Group selectedIndex={getTabIndex(location.pathname)}>
        <Header>
          <Tab.List className="flex items-center space-x-2">
            {tabs.map((tab) => (
              <Link to={tab.pathname} key={tab.pathname}>
                <Tab className="flex items-center space-x-2">
                  {tab.icon}
                  <span>{tab.name}</span>
                </Tab>
              </Link>
            ))}
          </Tab.List>
        </Header>
        <Content>
          <Tab.Panels>
            {tabs.map((tab) => (
              <Tab.Panel key={tab.pathname}>{children}</Tab.Panel>
            ))}
          </Tab.Panels>
        </Content>
      </Tab.Group>
    </div>
  );
};
