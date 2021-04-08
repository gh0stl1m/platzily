const { link } = require('../../../../adapters');
const schema = require('./schema')

async function linkRouter(fastify) {
  fastify.post('/', { schema }, link.createShortUrl);
}

module.exports = linkRouter;