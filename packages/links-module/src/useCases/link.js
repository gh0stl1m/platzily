const {
  logger,
  BusinessError,
  validators,
  sanitizers: { errorFieldParser },
  constants: { errorTypes },
} = require('../utils');

const createShortURL = ({ model, idGenerator }) => async (originalUrl, fullHostnameURL) => {
  if (!validators.isValidURL(originalUrl) || !validators.isValidURL(fullHostnameURL)) {
    logger.error('[pl-link-module]: The URL provided is not valid');

    throw new BusinessError(errorTypes.URL_NOT_VALID, 'link-module');
  }

  logger.info(`[pl-link-module]: Creating short URL for ${originalUrl}`);

  let shortURL;
  try {
    shortURL = await model.create({
      originalUrl,
      hash: idGenerator.generate(),
    });
  } catch (error) {
   logger.error('[pl-link-module]: Error creating short URL: ', err.message);
    throw new BusinessError(errorTypes.WRITE_DATABASE_ERROR, 'link-module');
  }
  
  return `${fullHostnameURL}/${shortURL.hash}`;
};

const readUrlByHash = ({ model }) => async (hash, fieldsSelector = { _id: 1 }) => {
  if (!hash) {
    logger.error('[pl-link-module]: Error the hash parameter is required');
    throw new BusinessError(errorFieldParser('hash'), 'link-module');
  }

  logger.info('[pl-link-module]: Reading URL by hash');

  return model.findOne({ hash }, fieldsSelector);
}

module.exports = { createShortURL, readUrlByHash };

