async function createShortUrl(req, reply) {
  const { url } = req.body;
  
  req.log.info(`Creating short url for ${url}`);
  const hostnameUrl = `${req.protocol}://${req.hostname}`;
  const shortUrL = await this.linkAdapter.createShortUrl(url, hostnameUrl);

  return reply.code(201)
    .headers('Content-Type', 'application/json; charset=utf-8')
    .send({ data: shortUrL });
}

module.exports = {
  createShortUrl,
};
