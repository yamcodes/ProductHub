import { prisma } from '@/lib/prisma';
import { makeRouter, publicProcedure } from '@/lib/trpc';

// users(info) ==> a list of users
// users is a variable that holds the list
// getUsers(info) --> a list of users
export const productsRouter = makeRouter({
  all: publicProcedure.query(() => prisma.product.findMany()),
});
