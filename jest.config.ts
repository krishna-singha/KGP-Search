import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  preset: "ts-jest",
  transformIgnorePatterns: [
    "/node_modules/(?!lucide-react|@testing-library/react|@testing-library/jest-dom)", 
  ],
  moduleNameMapper: {
    "^lucide-react$": "<rootDir>/node_modules/lucide-react/dist/cjs/lucide-react.js",
  },
};

export default createJestConfig(config);
