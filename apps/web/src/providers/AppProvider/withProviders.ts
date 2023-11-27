// export all providers as a single HOC

import { HOC } from '~/types';
import { ComponentType } from 'react';
import { flow } from 'lodash-es';
/**
 * HOC for all providers in the app
 */
export const withProviders = (component: ComponentType, providers: HOC[]) =>
  flow(providers)(component);
