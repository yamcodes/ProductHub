import { initTRPC } from '@trpc/server';

const t = initTRPC.create();

/**
 * Make a tRPC router
 */
export const makeRouter = t.router;

/**
 * Create an unprotected procedure
 * @see https://trpc.io/docs/v10/procedures
 **/
export const publicProcedure = t.procedure;
