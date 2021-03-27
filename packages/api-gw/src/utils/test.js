const fastify = require('fastify');

function buildMockServer(plugin) {
  return fastify().register(plugin);
}

export default buildMockServer;
