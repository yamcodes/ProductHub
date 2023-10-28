// HOC for Suspense

import { FunctionComponent, Suspense } from 'react';

export const withSuspense = (Component: FunctionComponent) => () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);
