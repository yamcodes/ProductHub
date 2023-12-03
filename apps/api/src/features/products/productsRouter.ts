import { prisma } from '@/lib/prisma';
import { createRouter, publicProcedure } from '@/lib/trpc';
import { z } from 'zod';

export const productsRouter = createRouter({
  all: publicProcedure.query(() => prisma.product.findMany()),
  one: publicProcedure
    .input(z.string().min(1))
    .query((opts) => prisma.product.findUnique({ where: { id: opts.input } })),
  deleteOne: publicProcedure
    .input(z.string().min(1))
    .mutation(async ({ input: id }) => {
      await prisma.product.delete({ where: { id } });
      return { id };
    }),
  createOne: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        quantity: z.number().min(1),
        brand: z.string().min(1),
      }),
    )
    .mutation(async ({ input: { name, quantity, brand } }) => {
      const product = await prisma.product.create({
        data: { name, quantity, brand },
      });
      return product;
    }),
});
