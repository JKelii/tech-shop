import path from "node:path";
import { fileURLToPath } from "node:url";

import { includeIgnoreFile } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import pluginQuery from "@tanstack/eslint-plugin-query";
import pluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import pluginTailwind from "eslint-plugin-tailwindcss";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});
const gitignorePath = path.resolve(__dirname, ".gitignore");

export default tseslint.config(
  ...compat.extends("next/core-web-vitals"),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginTailwind.configs["flat/recommended"],
  ...pluginQuery.configs["flat/recommended"],
  includeIgnoreFile(gitignorePath),
  {
    plugins: { "simple-import-sort": simpleImportSort },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "no-unused-vars": "off",
      "tailwindcss/no-custom-classname": "off",
      "@typescript-eslint/consistent-type-imports": "error",
      "comma-dangle": ["error", "never"],
      "@typescript-eslint/no-floating-promises": [
        "error",
        {
          ignoreVoid: true,
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "prettier/prettier": ["off", { endOfLine: "auto" }],
      "@typescript-eslint/no-empty-object-type": "off",

      "@typescript-eslint/prefer-optional-chain": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "require-await": "error",
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // node imports
            ["^node:"],
            // packages
            ["^@?\\w"],
            // relative paths
            ["^\\."],
            // components
            ["^@/components"],
            // absolute imports like @/hooks, @/lib
            ["^@/"],
            // package type imports

            ["^(?!@/).+\\u0000$"],
            // absolute type imports like @/types
            ["^@/.+\\u0000$"],
            // css and scss files
            ["^.+\\.s?css$"],
          ],
        },
      ],
      "tailwindcss/no-arbitrary-value": "off",
    },

    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.js"],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      tailwindcss: {
        callees: ["cva", "twJoin"],
      },
    },
  },
  pluginPrettierRecommended,
);
