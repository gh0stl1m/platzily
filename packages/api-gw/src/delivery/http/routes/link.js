const { link } = require('../../../adapters');

async function linkRouter(fastify) {
  fastify.post('/link', link.createShortUrl);
}

module.exports = linkRouter;