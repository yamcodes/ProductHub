// HOC for QueryClientProvider

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const withQueryClient = (Component: React.FC) => {
  const queryClient = new QueryClient();

  return () => (
    <QueryClientProvider client={queryClient}>
      <Component />
    </QueryClientProvider>
  );
};
