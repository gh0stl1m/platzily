const { healthyChecks } = require('../../../adapters');

module.exports = async function health(fastify) {
  fastify.get('/status', healthyChecks.liveness);
}