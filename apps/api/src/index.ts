import Fastify from "fastify";
// Require library to exit fastify process, gracefully (if possible)
import closeWithGrace from "close-with-grace";
import { env } from "@/config";

// Instantiate Fastify with some config
const app = Fastify({
  logger: true,
});

// Register your application as a normal plugin.
app.register(import("./app"));

// delay is the number of milliseconds for the graceful close to finish 
const closeListeners = closeWithGrace({ delay: env.FASTIFY_CLOSE_GRACE_DELAY}, async function ({ signal, err, manual }) {
  if (err) {
    app.log.error(err)
  }
  await app.close()
} as closeWithGrace.CloseWithGraceAsyncCallback)

app.addHook('onClose', async (instance) => {
  closeListeners.uninstall()
});

/**
 * Run the server!
 */
const start = async () => {
  try {
    await app.listen({ port: env.PORT, host: '127.0.0.1' });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
