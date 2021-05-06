function createError({
    statusCode = 500,
    error = 'Internal Server Error',
    message = ''
}) {

  return {
    statusCode,
    error,
    message
  }
}

module.exports = {
  createError
}