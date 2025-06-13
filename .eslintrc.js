/**
 * ESLint-Konfiguration für Next.js + TypeScript + Prettier + Filename-Conventions
 */

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint', 'prettier', 'filenames'],
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    // Formatierung übernimmt Prettier
    'prettier/prettier': 'error',

    // TypeScript-Feinschliff
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',

    // Filename-Konventionen
    'filenames/match-regex': [
      'error',
      '^[a-z][a-zA-Z0-9]*\\.ts$',
      {
        ignoreMiddleExtensions: true,
        message:
          'Dateinamen müssen camelCase oder spezifische Konventionen verwenden.',
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.tsx'],
      rules: {
        'filenames/match-regex': [
          'error',
          '^(?:[A-Z][a-z0-9]+)+\\.tsx$',
          {
            ignoreMiddleExtensions: true,
            message:
              'React-Komponenten müssen in PascalCase benannt sein (z.B. CustomerForm.tsx)',
          },
        ],
      },
    },
    {
      files: ['**/*.type.ts', '**/*.dto.ts'],
      rules: {
        'filenames/match-regex': [
          'error',
          '^[a-z0-9\\-]+\\.(type|dto)\\.ts$',
          {
            message:
              'Typ- und DTO-Dateien müssen in kebab-case geschrieben sein (z.B. person-form.dto.ts)',
          },
        ],
      },
    },
    {
      files: ['**/page.tsx', '**/layout.tsx'],
      rules: {
        'filenames/match-regex': 'off',
      },
    },
  ],
  ignorePatterns: ['.next', 'node_modules', 'dist', 'build'],
};
