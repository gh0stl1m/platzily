const fastify = require('fastify');
const mongoose = require('mongoose');
const hash = require('./hash');
const adapters = require('../../plugins/adapters');
const { buildMockServer } = require('../../utils/testUtils');

describe('/:hash', () => {
  let server;

  beforeEach(async () => {
    server = fastify({});
    server.get('/:hash', hash.redirectToUrl)
    server.register(adapters);
    await server.ready();
  });

  afterEach(async function () {
    if (server) {
      await server.close();
      server = null;
    }
  })

  it('Get: Given an invalid hash, a valid error object must be returned by the service', async () => {
    // Act
    const response = await server.inject({
      method: 'GET',
      url: '/badHash',
    });

    // Asserts
    expect(response.statusCode).toBe(404);
    expect(response.json().statusCode).toBe(404);
    expect(response.json().error).toBe('Not found');
    expect(response.json().message).toBe('Oops, it looks like this url do not exist anymore');
  });
});


