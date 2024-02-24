import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET_KEY: z.string(),
});
export type Env = z.infer<typeof envSchema>;
