import { z } from 'zod';

/**
 * Single source of truth for environment configuration. Every env var the app
 * reads must be declared and validated here — never read `import.meta.env`
 * directly anywhere else. The app fails fast at startup if anything is invalid.
 */
const EnvSchema = z.object({
  API_URL: z.string().default('/api'),
  ENABLE_API_MOCKING: z
    .string()
    .optional()
    .transform((value) => value === 'true'),
  APP_TITLE: z.string().default('React Template'),
});

const parsed = EnvSchema.safeParse({
  API_URL: import.meta.env.VITE_API_URL,
  ENABLE_API_MOCKING: import.meta.env.VITE_ENABLE_API_MOCKING,
  APP_TITLE: import.meta.env.VITE_APP_TITLE,
});

if (!parsed.success) {
  throw new Error(
    `Invalid environment variables:\n${JSON.stringify(
      parsed.error.flatten().fieldErrors,
      null,
      2,
    )}`,
  );
}

export const env = parsed.data;
