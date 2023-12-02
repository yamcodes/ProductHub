import Fastify from 'fastify';
import { app } from './app';
const fastify = Fastify({
  logger: true,
});

/**
 * Register the app as a normal plugin.
 * You could also use `fastify.register(app, { prefix: '/v1' })` to define a prefix.
 */
fastify.register(app);

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '127.0.0.1' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
