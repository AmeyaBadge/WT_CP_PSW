import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// ✅ Main export
export default [
  // 🔥 Add this block at the top to ignore files/folders
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "dist/**",
      "build/**",
      "out/**",
      "src/generated/**", // ✅ your Prisma WASM or generated stuff
    ],
  },

  // Custom rules override
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn", // ✅ your rule override here
    },
  },

  // ✅ Then bring in your old-style Next.js ESLint config
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];
