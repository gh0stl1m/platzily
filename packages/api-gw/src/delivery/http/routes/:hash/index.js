const { hash } = require('../../../../adapters');

async function hashRouter(fastify) {
  fastify.get('/', hash.redirectToUrl);
}

module.exports = hashRouter;