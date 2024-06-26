import dotenv from "dotenv";
import path from "path";
import { Config } from "./types";

const getDotEnvPath = (env?: string): string => {
  if (env === "test") {
    return ".env.test";
  }
  return ".env";
};

dotenv.config({
  path: path.join(process.cwd(), getDotEnvPath(process.env.NODE_ENV)),
});

const env = process.env.NODE_ENV || "development";
const isDev = env === "development";
const isTest = env === "test";

const config: Config = {
  env,
  isDev,
  isTest,
  port: +(process.env.PORT || 3000),
  host: process.env.HOST || "127.0.0.1",
  urlMount: process.env.URL_MOUNT || "/api",
  db: {
    password: process.env.DB_PASSWORD || "password",
    user: process.env.DB_USER || "postgres",
    name: process.env.DB_NAME || "postgres",
    port: +(process.env.DB_PORT || 5432),
    host: process.env.DB_HOST || "localhost",
  },
  pageLimit: 100,
  discountCode: {
    allowedChars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    length: 6,
  },
  corsOrigin: process.env.CORS_ORIGIN || "*",
};

export default config;
