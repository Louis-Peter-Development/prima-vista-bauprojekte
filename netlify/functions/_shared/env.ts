declare const Netlify:
  | {
      env: {
        get(name: string): string | undefined;
      };
    }
  | undefined;

export function getEnv(name: string): string | undefined {
  if (typeof Netlify !== 'undefined') {
    return Netlify.env.get(name) ?? process.env[name];
  }
  return process.env[name];
}

export function requireEnv(name: string): string {
  const value = getEnv(name);
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}
