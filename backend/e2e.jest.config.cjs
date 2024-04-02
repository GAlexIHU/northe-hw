const baseConfig = require("./jest.config.cjs");

/** @type {import('jest').Config} */
const config = {
  ...baseConfig,
  testPathIgnorePatterns: [],
  testRegex: "tests/e2e/.*(\\.|/)(test|spec)\\.[jt]sx?$",
};

module.exports = config;
