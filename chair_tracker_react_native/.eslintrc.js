module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks', 'jest', 'prettier', 'import'],
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: ['@react-native-community', 'airbnb-typescript', 'prettier'],
  env: {
    'jest/globals': true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      'babel-module': {},
      node: {
        extensions: ['.d.ts'],
      },
    },
  },
  rules: {
    'arrow-body-style': ['error'],
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'eslint-comments/no-unlimited-disable': 0,
    'eslint-comments/no-unused-disable': 0,
    '@typescript-eslint/consistent-type-imports': 2,
    '@typescript-eslint/prefer-ts-expect-error': 2,
    'import/prefer-default-export': 0,
    'import/order': [
      'error',
      {
        groups: [
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'unknown',
        ],
        pathGroups: [
          {
            pattern: 'styled-components/native',
            patternOptions: { matchBase: true },
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'react-native',
            patternOptions: { matchBase: true },
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'react',
            patternOptions: { matchBase: true },
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
