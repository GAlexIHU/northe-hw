/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  globalSetup: "./backend/tests/jestGlobalSetup.ts",
  moduleFileExtensions: ["js", "json", "jsx", "node", "mjs"],
  transformIgnorePatterns: [],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
  testMatch: [
    "**/backend/__tests__/**/*.[t]s?(x)",
    "**/backend/?(*.)+(spec|test|tests).[t]s?(x)",
  ],
  verbose: true,
};

export default config;
