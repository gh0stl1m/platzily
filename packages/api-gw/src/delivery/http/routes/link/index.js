const { link } = require('../../../../adapters');

async function linkRouter(fastify) {
  fastify.post('/', link.createShortUrl);
}

module.exports = linkRouter;