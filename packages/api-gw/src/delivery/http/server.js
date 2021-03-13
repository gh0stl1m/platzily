const Fastify = require('fastify');

async function start() {
  const fastify = Fastify({ logger: true });

  fastify.register(require('./routes/healthychecks'));
  fastify.register(require('./routes/link'));

  try {
    await fastify.listen(process.env.SERVER_PORT || 3000);
  } catch(err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

module.exports = start;