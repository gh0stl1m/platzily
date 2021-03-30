const { createError } = require('../../utils/errorHandling');

async function redirectToUrl(req, reply) {
  const { hash } = req.params;
  req.log.info(`Getting url from ${hash} hash`);
  const link = await this.linkAdapter.readUrlByHash(hash, { _id: 0, originalUrl: 1 });

  if (link) {
    return reply.redirect(link.originalUrl);
  }

  return reply.code(404)
    .headers('Content-Type', 'application/json; charset=utf-8')
    .send(createError({
      statusCode: 404,
      error: "Not found",
      message: "Oops, it looks like this url do not exist anymore"
    }));
}

module.exports = {
  redirectToUrl
};
