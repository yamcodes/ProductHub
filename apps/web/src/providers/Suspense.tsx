// HOC for Suspense

import { Suspense } from 'react';
import { HOC } from '@/types';

export const withSuspense: HOC = (Component) => () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);
