import { z } from 'zod';

const envSchema = z.object({
  LASTFM_TOKEN: z.string(),
});

export const ENV = envSchema.parse(process.env);
