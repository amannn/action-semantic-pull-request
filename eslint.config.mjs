import {getPresets} from 'eslint-config-molindo';
import globals from 'globals';

export default [
  ...(await getPresets('javascript', 'vitest')),
  {
    languageOptions: {
      globals: globals.node
    }
  }
];
