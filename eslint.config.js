import fs from 'node:fs';

import js from '@eslint/js';
import vitest from '@vitest/eslint-plugin';
import checkFile from 'eslint-plugin-check-file';
import importPlugin from 'eslint-plugin-import';
import jestDom from 'eslint-plugin-jest-dom';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import playwright from 'eslint-plugin-playwright';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import testingLibrary from 'eslint-plugin-testing-library';
import prettier from 'eslint-config-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/**
 * Cross-feature isolation is enforced automatically: every directory under
 * `src/features/<x>` is forbidden from importing any sibling feature. New
 * features are picked up here with no manual edits — just create the folder.
 */
const featureDirs = fs.existsSync('./src/features')
  ? fs
      .readdirSync('./src/features', { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
  : [];

const crossFeatureZones = featureDirs.map((name) => ({
  target: `./src/features/${name}`,
  from: './src/features',
  except: [`./${name}`],
}));

export default tseslint.config(
  {
    ignores: [
      'dist',
      'coverage',
      'node_modules',
      'playwright-report',
      'test-results',
      'public/mockServiceWorker.js',
    ],
  },

  // React version applies everywhere so plugin-react rules never warn.
  { settings: { react: { version: 'detect' } } },

  // ---- Application source ----------------------------------------------------
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
      jsxA11y.flatConfigs.recommended,
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'check-file': checkFile,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // Type-safety guard-rails — these are non-negotiable for this template.
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],

      'react/prop-types': 'off',

      // TypeScript owns module resolution (paths/aliases via tsconfig). The
      // import plugin's resolver double-checks and produces false negatives for
      // `@/` aliases, so defer entirely to tsc for these.
      'import/no-unresolved': 'off',
      'import/named': 'off',
      'import/namespace': 'off',
      'import/default': 'off',
      'import/export': 'off',

      // Architecture: unidirectional layering + cross-feature isolation.
      // shared (components/hooks/lib/types/utils/config) -> features -> app
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            ...crossFeatureZones,
            {
              target: './src/features',
              from: './src/app',
              message:
                'Features must not import from the app layer. Compose features inside src/app instead.',
            },
            {
              target: [
                './src/components',
                './src/hooks',
                './src/lib',
                './src/types',
                './src/utils',
                './src/config',
              ],
              from: ['./src/features', './src/app'],
              message:
                'Shared modules must not import from features or app. Keep the dependency direction shared -> features -> app.',
            },
          ],
        },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',

      // Forbid reaching across directory boundaries with deep relative paths;
      // use the `@/` alias instead. Cross-feature and layering rules are
      // enforced above by import/no-restricted-paths.
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../../*'],
              message:
                'Use the @/ alias for cross-directory imports instead of deep relative paths (../../).',
            },
          ],
        },
      ],

      // Naming conventions enforced in CI, not just by convention.
      'check-file/filename-naming-convention': [
        'error',
        { '**/*.{ts,tsx}': 'KEBAB_CASE' },
        { ignoreMiddleExtensions: true },
      ],
      'check-file/folder-naming-convention': [
        'error',
        { 'src/**/': 'KEBAB_CASE' },
      ],
    },
  },

  // ---- Unit / integration tests ---------------------------------------------
  {
    files: ['src/**/*.test.{ts,tsx}', 'src/testing/**/*.{ts,tsx}'],
    languageOptions: {
      // Some vitest rules (e.g. valid-title) need type information.
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      vitest,
      'testing-library': testingLibrary,
      'jest-dom': jestDom,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      ...testingLibrary.configs['flat/react'].rules,
      ...jestDom.configs['flat/recommended'].rules,
    },
  },

  // ---- End-to-end tests ------------------------------------------------------
  {
    ...playwright.configs['flat/recommended'],
    files: ['e2e/**/*.{ts,tsx}'],
  },

  // ---- Tooling / config files -----------------------------------------------
  {
    files: ['**/*.{js,cjs,mjs}'],
    languageOptions: {
      globals: { ...globals.node },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },

  // Prettier disables every formatting rule — keep this last.
  prettier,
);
