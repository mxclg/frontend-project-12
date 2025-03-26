import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist', 'node_modules', 'build'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        AudioWorkletGlobalScope: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^React$' }],
      'no-param-reassign': [
        'error',
        {
          props: true,
          ignorePropertyModificationsFor: ['state'],
        },
      ],

      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      'react/prop-types': 'off',
      'no-console': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': 'off',

      'no-underscore-dangle': ['error', { allow: ['__filename', '__dirname'] }],
      'react/function-component-definition': [
        'error',
        { namedComponents: 'arrow-function' },
      ],
      'testing-library/no-debug': 'off',
      'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
    },
  },
];