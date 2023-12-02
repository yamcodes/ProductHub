// This file exposes the tRPC router for the API app.

import { productsRouter } from '@/features/products';
import { makeRouter } from '@/lib/trpc';

export const appRouter = makeRouter({
  products: productsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
