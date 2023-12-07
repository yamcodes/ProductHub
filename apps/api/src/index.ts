import Fastify from 'fastify';
// Require library to exit fastify process, gracefully (if possible)
import closeWithGrace from 'close-with-grace';

// Instantiate Fastify with some config
const fastify = Fastify({
  logger: true,
});

(async () => {
  try {
    await fastify.register(import('@/app'));

    // Close with grace

    // delay is the number of milliseconds for the graceful close to finish
    const closeListeners = closeWithGrace(
      { delay: fastify.config.closeGraceDelay },
      async function ({ err }) {
        if (err) fastify.log.error(err);
        await fastify.close();
      } as closeWithGrace.CloseWithGraceAsyncCallback,
    );

    fastify.addHook('onClose', async () => {
      closeListeners.uninstall();
    });
    await fastify.listen({ port: fastify.config.port, host: '127.0.0.1' });
  } catch (err) {
    fastify.log.fatal(err);
    process.exit(1);
  }
})();
