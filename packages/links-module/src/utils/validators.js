const logger = require('./logger');

const isValidURL = url => {
  try {
    new URL(url);
  } catch (err) {
    logger.error('[pl-link-modukle]: The URL is not valid');
    return false;
  }

  return true;
}

module.exports = { isValidURL };
