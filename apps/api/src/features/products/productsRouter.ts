import { prisma } from '../../lib/prisma';
import { makeRouter, publicProcedure } from '../../lib/trpc';

export const productsRouter = makeRouter({
  list: publicProcedure.query(() => prisma.product.findMany()),
});
