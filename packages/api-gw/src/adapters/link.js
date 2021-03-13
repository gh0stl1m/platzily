const LinkUseCases = require('@platzily/links-module');

async function createShortUrl(req, reply) {
  const { url } = req.body;

  req.log.info(`Creating short url for ${url}`);
  const hostnameUrl = `${req.protocol}://${req.hostname}`;
  const shortUrl = await LinkUseCases.createShortUrl(url, hostnameUrl);

  reply.code(201)
    .headers('Content-Type', 'application/json; charset=utf-8')
    .send({ data: shortUrl });
}

module.exports = {
  createShortUrl,
};
