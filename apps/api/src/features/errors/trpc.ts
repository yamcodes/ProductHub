import type { AnyRouter, initTRPC } from '@trpc/server';
import type { FastifyHandlerOptions } from '@trpc/server/adapters/fastify';
import type { FastifyReply, FastifyRequest } from 'fastify';
import type { FastifyBaseLogger } from 'fastify';
import { ZodError } from 'zod';

type OnError = FastifyHandlerOptions<
  AnyRouter,
  FastifyRequest,
  FastifyReply
>['onError'];

export const createOnErrorWithLogger: (logger: FastifyBaseLogger) => OnError =
  (logger) =>
  ({ error }) => {
    const { message } = error;
    logger.error({ error }, message);
  };

type ErrorFormatter = ReturnType<
  typeof initTRPC.create
>['_config']['errorFormatter'];
export const errorFormatter: ErrorFormatter = (opts) => {
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
};
