import { createOnErrorWithLogger, onError } from '@/features/errors';
import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload';
import cors from '@fastify/cors';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import Fastify, { FastifyPluginAsync, FastifyServerOptions } from 'fastify';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createContext } from './context';
import { appRouter } from './router';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface AppOptions
  extends FastifyServerOptions,
    Partial<AutoloadPluginOptions> {}
// Pass --options via CLI arguments in command to enable these options.
export const options: AppOptions = {};

export const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts,
): Promise<void> => {
  await fastify.register(cors, {
    origin: (origin, callback) => {
      // disable CORS for curl or postman
      if (!origin) return callback(null, true);
      const { hostname } = new URL(origin);
      // disable CORS for localhost
      if (hostname === 'localhost') return callback(null, true);
      return callback(new Error('Not allowed'), false);
    },
  });

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts,
  });

  fastify.get('/', async function () {
    return;
  });

  // tRPC
  void fastify.register(fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: {
      router: appRouter,
      createContext,
      onError: createOnErrorWithLogger(fastify.log),
    },
  });

  fastify.setErrorHandler(function (error, request, reply) {
    if (error instanceof Fastify.errorCodes.FST_ERR_BAD_STATUS_CODE) {
      // Log error
      this.log.error(error);
      // Send error response
      reply.status(500).send({ ok: false });
    } else {
      // fastify will use parent error handler to handle this
      reply.send(error);
    }
  });
};

export default app;
