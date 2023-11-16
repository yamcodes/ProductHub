// HOC for Suspense

import { IconContext } from '@phosphor-icons/react';
import { HOC } from '~/types';

export const withIcons: HOC = (Component) => () => (
  <IconContext.Provider
    value={{
      size: 16,
    }}
  >
    <Component />
  </IconContext.Provider>
);
