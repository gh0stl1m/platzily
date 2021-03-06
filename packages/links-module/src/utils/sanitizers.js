const BusinessError = require('./BusinessError');
const { errorTypes: { FIELD_IS_REQUIRED }} = require('./constants');

const errorFieldParser = (field) => {
  if (!field) throw new BusinessError(FIELD_IS_REQUIRED);

  return `FIELD_${field.toUpperCase()}_IS_REQUIRED`;
};

module.exports = {
  errorFieldParser,
}