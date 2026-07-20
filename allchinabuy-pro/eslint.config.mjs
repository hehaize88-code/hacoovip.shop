import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Framework and deployment output. The repository intentionally tracks the
    // Pages export, but generated JavaScript must never be treated as source.
    ".next/**",
    "_next/**",
    "out/**",
    "dist/**",
    ".sites-runtime/**",
    ".wrangler/**",
    "outputs/**",
    "work/**",
    "next-env.d.ts",
    "worker-configuration.d.ts",
  ]),
]);

export default eslintConfig;
