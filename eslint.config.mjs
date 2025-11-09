import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import prettierPlugin from 'eslint-plugin-prettier';
import tsParser from '@typescript-eslint/parser';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    // combined ignores (next defaults + project-specific)
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'node_modules/**',
    'dist/**',
  ]),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        project: ['./tsconfig.json'],
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
      prettier: prettierPlugin,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react$'],
            ['^@?\\w'], // third-party packages
            ['^@/'], // internal aliases like "@/..."
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'], // parent imports
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)'], // same-folder imports
            ['^.+\\.css$'], // css imports last
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      // turn off conflicting rules
      'import/order': 'off',
      'sort-imports': 'off',
      'prettier/prettier': 'error',
    },
  },
]);
