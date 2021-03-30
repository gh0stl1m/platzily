const { createError } = require('../../utils/errorHandling');

async function createShortUrl(req, reply) {
  const { url } = req.body;

  req.log.info(`Creating short url for ${url}`);

  if (!url) {
    return reply.code(400)
      .headers('Content-Type', 'application/json; charset=utf-8')
      .send(createError({
        statusCode: 400,
        error: 'Bad request',
        message: 'URL field is required'
      }));
  }

  const hostnameUrl = `${req.protocol}://${req.hostname}`;
  const shortUrL = await this.linkAdapter.createShortUrl(url, hostnameUrl);

  return reply.code(201)
    .headers('Content-Type', 'application/json; charset=utf-8')
    .send({ data: shortUrL });
}


module.exports = {
  createShortUrl
};
