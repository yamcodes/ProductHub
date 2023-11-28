// import type { Product } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { initTRPC } from '@trpc/server';
export const prisma = new PrismaClient();
export const t = initTRPC.create();

export const router = t.router({
  products: t.procedure.query(() => prisma.product.findMany()),
});

// export type definition of API
export type Router = typeof router;
