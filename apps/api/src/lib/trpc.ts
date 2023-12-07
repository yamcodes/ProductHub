import { errorFormatter } from '@/features/errors';
import { initTRPC } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';

const t = initTRPC.context<Context>().create({
  errorFormatter,
});

/**
 * Create a tRPC router
 */
export const createRouter = t.router;

/**
 * Create an unprotected procedure
 * @see https://trpc.io/docs/v10/procedures
 **/
export const publicProcedure = t.procedure;

export function createContext({ req, res }: CreateFastifyContextOptions) {
  const user = { name: req.headers.username ?? 'anonymous' };
  return { req, res, user };
}
export type Context = Awaited<ReturnType<typeof createContext>>;
