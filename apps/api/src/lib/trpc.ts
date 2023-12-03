import { initTRPC } from '@trpc/server';
import { ZodError } from 'zod';

const t = initTRPC.create({
  errorFormatter(opts) {
    const { shape, error } = opts;
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
        prismaError:
          error.code === 'INTERNAL_SERVER_ERROR' &&
          error.cause instanceof Error &&
          error.cause.message.includes('Invalid'),
      },
    };
  },
});

/**
 * Make a tRPC router
 */
export const makeRouter = t.router;

/**
 * Create an unprotected procedure
 * @see https://trpc.io/docs/v10/procedures
 **/
export const publicProcedure = t.procedure;
