import fp from 'fastify-plugin';
import { getConfig } from '@/config';
import type { Config } from '@/config';
import { ZodError } from 'zod';

export interface SupportPluginOptions {
  // Specify Support plugin options here
}

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<SupportPluginOptions>(async (fastify, _opts) => {
  try {
    const config = await getConfig();
    fastify.decorate('config', config);
  } catch (error) {
    const { errors } = <ZodError>error;
    if (!errors) throw error; // TODO: This is a hack. We should find a better way to error handle.
    errors.forEach((error) => {
      fastify.log.error(
        `Environment variable ${error.path.join('.')}: ${error.message}`,
      );
    });
    throw new Error('Invalid config');
  }
});

// When using .decorate you have to specify added properties for Typescript
declare module 'fastify' {
  export interface FastifyInstance {
    config: Config;
  }
}
