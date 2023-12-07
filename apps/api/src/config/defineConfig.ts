// defineConfig.ts

import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();
/**
 * The schema for the config object
 */
export const configSchema = z.object({
  /**
   * The delay in milliseconds before the API closes after receiving a SIGTERM signal
   * @default 5000
   */
  closeGraceDelay: z.number().min(0).default(5000),
  /**
   * The port the API will listen on.
   * @default 3000
   */
  port: z.number().min(0).max(65535).default(3000),
  /**
   * The URL of the API used for connecting to it from the web app
   * @default http://localhost:3000
   */
  apiUrl: z.string().url().default('http://localhost:3000'),
});

export type ConfigInput = z.input<typeof configSchema>;
export type Config = z.output<typeof configSchema>;

// default overload
export function defineConfig(config: ConfigInput): Config;
// overload for process.env
export function defineConfig(env: NodeJS.ProcessEnv): Config;
// implementation
export function defineConfig(_config: ConfigInput | NodeJS.ProcessEnv): Config {
  let config = _config;
  if (_config === process.env) {
    // we are in the process.env case
    const envCaseToCamelCase = (str: string) =>
      str.toLowerCase().replace(/_([a-z])/g, (m) => m[1].toUpperCase());
    config = Object.fromEntries(
      Object.entries(config).map(([key, value]) => [
        envCaseToCamelCase(key),
        value,
      ]),
    );
    // attempt to parse any numbers
    config = Object.fromEntries(
      Object.entries(config).map(([key, value]) => [
        key,
        isNaN(Number(value)) ? value : Number(value),
      ]),
    );
  }
  return configSchema.parse(config);
}
