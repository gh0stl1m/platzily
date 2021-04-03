const { link } = require('../../../../adapters');

async function hashRouter(fastify) {
  fastify.get('/', link.redirectToUrl);
}

module.exports = hashRouter;