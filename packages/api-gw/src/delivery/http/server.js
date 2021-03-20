const Fastify = require('fastify');
const autoload = require('fastify-autoload');
const path = require('path');
async function start() {
  const fastify = Fastify({ logger: true });

  fastify.register(autoload, { dir: path.join(__dirname, 'routes') });
  fastify.register(autoload, { dir: path.join(process.env.PWD, 'src/plugins')});

  try {
    await fastify.listen(process.env.SERVER_PORT || 3000, '0.0.0.0');
  } catch(err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

module.exports = start;