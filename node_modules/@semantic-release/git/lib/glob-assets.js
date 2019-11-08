const {isPlainObject, castArray, uniq} = require('lodash');
const dirGlob = require('dir-glob');
const globby = require('globby');
const debug = require('debug')('semantic-release:git');

module.exports = async ({cwd}, assets) =>
  uniq(
    [].concat(
      ...(await Promise.all(
        assets.map(async asset => {
          // Wrap single glob definition in Array
          let glob = castArray(isPlainObject(asset) ? asset.path : asset);
          // TODO Temporary workaround for https://github.com/mrmlnc/fast-glob/issues/47
          glob = uniq([...(await dirGlob(glob, {cwd})), ...glob]);

          // Skip solo negated pattern (avoid to include every non js file with `!**/*.js`)
          if (glob.length <= 1 && glob[0].startsWith('!')) {
            debug(
              'skipping the negated glob %o as its alone in its group and would retrieve a large amount of files',
              glob[0]
            );
            return [];
          }

          const globbed = await globby(glob, {
            cwd,
            expandDirectories: false, // TODO Temporary workaround for https://github.com/mrmlnc/fast-glob/issues/47
            gitignore: false,
            dot: true,
            onlyFiles: false,
          });

          return globbed.length > 0 ? globbed : [];
        })
      ))
    )
  );
