// HOC for QueryClientProvider

import { FunctionComponent } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const withQueryClient = (Component: FunctionComponent) => {
  const queryClient = new QueryClient();

  return () => (
    <QueryClientProvider client={queryClient}>
      <Component />
    </QueryClientProvider>
  );
};

export default withQueryClient;
