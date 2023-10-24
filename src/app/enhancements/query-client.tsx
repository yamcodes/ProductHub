// HOC for QueryClientProvider

import { FunctionComponent } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const withQueryClient = (Component: FunctionComponent) => {
  const queryClient = new QueryClient();

  return () => (
    <QueryClientProvider client={queryClient}>
      <Component />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default withQueryClient;
