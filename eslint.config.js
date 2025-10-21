// eslint.config.js
/**
 * Pragmatic baseline: non type-aware.
 * TypeScript (tsc) remains your type checker; ESLint handles style & obvious bugs.
 */
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

const base = {
  languageOptions: {
    ecmaVersion: 2024,
    sourceType: 'module',
    globals: { ...globals.browser },
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },
  rules: {
    ...js.configs.recommended.rules,
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    // Prefer TS plugin where available, but non type-aware:
    'no-unused-vars': 'off',
  },
};

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'coverage'] },

  // App files
  {
    ...base,
    files: ['src/**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommended, // non type-aware
      prettier,
    ],
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },

  // Tests
  {
    ...base,
    files: [
      'src/**/__tests__/**/*.{ts,tsx}',
      'src/**/*.test.ts',
      'src/**/*.test.tsx',
      'src/setupTests.ts',
    ],
    languageOptions: {
      ...base.languageOptions,
      globals: { ...base.languageOptions.globals, jest: true, expect: true },
    },
    extends: [
      tseslint.configs.recommended, // non type-aware
      prettier,
    ],
    rules: {
      // Be forgiving in tests/mocks
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/require-await': 'off',
    },
  }
);
