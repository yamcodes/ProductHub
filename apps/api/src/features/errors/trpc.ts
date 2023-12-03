import type { AnyRouter } from '@trpc/server';
import type { FastifyHandlerOptions } from '@trpc/server/adapters/fastify';
import type { FastifyReply, FastifyRequest } from 'fastify';
import type { FastifyBaseLogger } from 'fastify';
export const onError: FastifyHandlerOptions<
  AnyRouter,
  FastifyRequest,
  FastifyReply
>['onError'] = ({ error, ctx }) => {
  const { message, code } = error;

  console.error({ error: { message, code } }, message);
};

export const createOnErrorWithLogger: (
  logger: FastifyBaseLogger,
) => FastifyHandlerOptions<
  AnyRouter,
  FastifyRequest,
  FastifyReply
>['onError'] =
  (logger) =>
  ({ error }) => {
    const { message } = error;
    logger.error({ error }, message);
  };
