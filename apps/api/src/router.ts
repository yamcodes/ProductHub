// This file exposes the tRPC router for the API app.

import { productsRouter } from './features/products/productsRouter';
import { makeRouter } from './lib/trpc';

export const router = makeRouter({
  products: productsRouter,
});

// export type definition of API
export type Router = typeof router;
