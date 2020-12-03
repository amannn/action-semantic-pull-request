const {isString, isNil, isBoolean} = require('lodash');
const getError = require('./get-error');

const isNonEmptyString = (value) => isString(value) && value.trim();

const VALIDATORS = {
  npmPublish: isBoolean,
  tarballDir: isNonEmptyString,
  pkgRoot: isNonEmptyString,
};

module.exports = ({npmPublish, tarballDir, pkgRoot}) => {
  const errors = Object.entries({npmPublish, tarballDir, pkgRoot}).reduce(
    (errors, [option, value]) =>
      !isNil(value) && !VALIDATORS[option](value)
        ? [...errors, getError(`EINVALID${option.toUpperCase()}`, {[option]: value})]
        : errors,
    []
  );

  return errors;
};
