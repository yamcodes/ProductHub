import type { FastifyBaseLogger, FastifyPluginAsync } from 'fastify';
import Fastify from 'fastify';

type FastifyErrorHandler = Parameters<
  Parameters<FastifyPluginAsync>[0]['setErrorHandler']
>[0];

export const createErrorHandlerWithLogger: (
  logger: FastifyBaseLogger,
) => FastifyErrorHandler = (logger) => (error, request, reply) => {
  if (error instanceof Fastify.errorCodes.FST_ERR_BAD_STATUS_CODE) {
    // Log error
    logger.error(error);
    // Send error response
    reply.status(500).send({ ok: false });
  } else {
    // fastify will use parent error handler to handle this
    reply.send(error);
  }
};
