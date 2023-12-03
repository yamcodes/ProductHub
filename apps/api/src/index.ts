import Fastify from 'fastify';
// Require library to exit fastify process, gracefully (if possible)
import closeWithGrace from 'close-with-grace';
import { env } from '@/config';

// Instantiate Fastify with some config
const fastify = Fastify({
  logger: true,
});

// Register your application as a normal plugin.
fastify.register(import('./app'));

// delay is the number of milliseconds for the graceful close to finish
const closeListeners = closeWithGrace(
  { delay: env.FASTIFY_CLOSE_GRACE_DELAY },
  async function ({ err }) {
    if (err) fastify.log.error(err);
    await fastify.close();
  } as closeWithGrace.CloseWithGraceAsyncCallback,
);

fastify.addHook('onClose', async () => {
  closeListeners.uninstall();
});

(async () => {
  try {
    await fastify.listen({ port: env.PORT, host: '127.0.0.1' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
