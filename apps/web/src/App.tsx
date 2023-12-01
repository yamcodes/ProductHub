import { RouterProvider } from '@tanstack/react-router';
import { router } from '@/routes';
import { AppProvider, providers } from './providers';
import { api } from '@/lib/trpc';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';

// Create the app by enhancing the router with HOCs

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const trpcClient = api.createClient({
  links: [httpBatchLink({ url: 'http://localhost:3000/trpc' })],
});

export const App = () => (
  <api.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <AppProvider providers={providers}>
        <RouterProvider router={router} />
      </AppProvider>
    </QueryClientProvider>
  </api.Provider>
);
