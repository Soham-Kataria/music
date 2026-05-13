import dotenv from 'dotenv';

dotenv.config();

const requireEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is missing`);
  }
  return value;
};

export const config = {
  port: Number(process.env.PORT) || 5000,
  mongoUri: requireEnv('MONGO_URI'),
  jwtSecret: requireEnv('JWT_SECRET'),
  nodeEnv: process.env.NODE_ENV ?? 'development',
} as const;
