const fastify = require('fastify');
const link = require('./link');
const adapters = require('../../plugins/adapters');
const { buildMockServer } = require('../../utils/testUtils');

describe('/link', () => {
  let server;

  beforeEach(async () => {
    server = fastify({});
    server.post('/link', link.createShortUrl);
    server.register(adapters);
    await server.ready();
  });

  afterEach(async function () {
    if (server) {
      await server.close();
      server = null;
    }
  })

  it('Post: Given an url in the body, a shorter url must be returned by the service', async () => {
    // Act
    const response = await server.inject({
        method: 'POST',
        url: '/link',
        body: { url: 'https://this-is-a-test.com' }
    });

    // Asserts
    expect(response.statusCode).toEqual(201);
    expect(typeof response.json().data).toEqual('string');
  });

  it('Post: Without a url param in the body, a valid error object must be returned by the service', async () => {
    // Act
    const response = await server.inject({
      method: 'POST',
      url: '/link',
      body: { badParam: 'https://this-is-a-test.com' }
    });

    // Asserts
    expect(response.statusCode).toEqual(400);
    expect(response.json().statusCode).toEqual(400);
    expect(response.json().error).toEqual('Bad request');
    expect(response.json().message).toEqual('URL field is required');
  });
});


