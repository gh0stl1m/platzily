module.exports = {
  body: {
    type: 'object',
    properties: {
      url: { type: 'string' },
    },
    required: ['url']
  }
}