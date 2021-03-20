const LinkUseCases = require('@platzily/links-module');

const fp = require('fastify-plugin');

async function adapters(fastify) {
  await fastify.decorate('linkAdapter', LinkUseCases);
}

module.exports = fp(adapters);
