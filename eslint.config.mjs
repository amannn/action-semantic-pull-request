import globals from 'globals';
import {getPresets} from 'eslint-config-molindo';

export default [
  ...(await getPresets('javascript', 'jest')),
  {
    languageOptions: {
      globals: {...globals.node, ...globals.jest}
    }
  }
];
