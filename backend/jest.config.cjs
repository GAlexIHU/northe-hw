const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("../tsconfig.json");

/** @type {import('jest').Config} */
const config = {
  verbose: true,
  preset: "ts-jest/presets/js-with-babel",
  testPathIgnorePatterns: ["e2e"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    // here rootdir reffers to /backend
    prefix: "<rootDir>/../",
  }),
};

module.exports = config;
