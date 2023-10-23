// HOC for Suspense

import { FunctionComponent, Suspense } from 'react';

const withSuspense = (Component: FunctionComponent) => () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);

export default withSuspense;
