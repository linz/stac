import base from '@linzjs/style/oxlint.config';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [base],
  // import plugin for import/no-duplicates (linz/style-js#1138)
  plugins: [...base.plugins, 'import'],
  env: {
    node: true,
    es2023: true,
  },
  rules: {
    // overrides for LINZ base config
    curly: ['error', 'multi-line'], // linz/style-js#1136
    'import/no-duplicates': 'error', // linz/style-js#1138
    'prefer-const': 'error',
    // stac is plain JavaScript with no types, so values from JSON.parse are `any` and these rules flag nearly every line
    'typescript/no-unsafe-argument': 'off',
    'typescript/no-unsafe-assignment': 'off',
    'typescript/no-unsafe-call': 'off',
    'typescript/no-unsafe-member-access': 'off',
  },
});
