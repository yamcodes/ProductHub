import z, { ZodError } from 'zod';
import pino from 'pino';

const envSchema = z.object({
  // Note: all env variables are supplied as strings. We convert them through 'refine'
  FASTIFY_CLOSE_GRACE_DELAY: z.string().refine((val) => !isNaN(Number(val)), {
    message: 'Must be a number',
  }).default("5000").transform(Number).pipe(z.number().min(0)),
  PORT: z.string().refine((val) => !isNaN(Number(val)), {
    message: 'Must be a number',
  }).default("3000").transform(Number).pipe(z.number().min(0).max(65535)),
});

export let env: z.infer<typeof envSchema>;

try {
  env = envSchema.parse(process.env);
}
catch (err) {
  const { errors } = <ZodError>err;
  errors.forEach((error) => {
    pino().fatal(`Environment variable ${error.path.join('.')}: ${error.message}`)
  });
  process.exit(1);
}

