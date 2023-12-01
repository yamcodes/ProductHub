import { join } from 'path';
import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload';
import { FastifyPluginAsync, FastifyServerOptions } from 'fastify';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import { router } from './router';
import { createContext } from './context';
import cors from '@fastify/cors';

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

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts,
  });

  // tRPC
  void fastify.register(fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: { router, createContext },
  });
};

export default app;
