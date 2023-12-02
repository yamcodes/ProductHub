import z from 'zod';

const envSchema = z.object({
  // Note: all env variables are supplied as strings. We convert them through 'refine'
  FASTIFY_CLOSE_GRACE_DELAY: z.string().refine((val) => !isNaN(Number(val)), {
    message: 'Must be a number',
  }).default("5000").transform(Number).pipe(z.number().min(0)),
  PORT: z.string().refine((val) => !isNaN(Number(val)), {
    message: 'Must be a number',
  }).default("3000").transform(Number).pipe(z.number().min(0).max(65535)),
});

export const env = envSchema.parse(process.env);