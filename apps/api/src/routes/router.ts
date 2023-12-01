// This file exposes the tRPC router for the API app.

import { prisma } from '../lib/prisma';
import { makeRouter, publicProcedure } from '../lib/trpc';

export const router = makeRouter({
  products: publicProcedure.query(() => prisma.product.findMany()),
});

// export type definition of API
export type Router = typeof router;
