// This file exposes the tRPC router for the API app.

import { productsRouter } from '@/features/products';
import { createRouter } from '@/lib/trpc';

export const appRouter = createRouter({
  products: productsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
