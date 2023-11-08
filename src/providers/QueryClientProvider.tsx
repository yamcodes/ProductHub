// HOC for QueryClientProvider

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HOC } from '~/types';

export const withQueryClient: HOC = (Component) => () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Component />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
