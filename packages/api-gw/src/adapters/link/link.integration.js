const fastify = require('fastify');
const linkAdapters = require('./link');
const Faker = require('faker');
const linkRouterSchema = require('../../delivery/http/routes/link/schema');

describe('Link Adapters', () => {
  let server;

  beforeEach(async () => {
    server = fastify({});
  });

  afterEach(async function () {
    if (server) {
      await server.close();
      server = null;
    }
  })

  describe('/link', () => {
    it('Post: Given an url in the body, a shorter url must be returned by the service', async () => {
      // Arrange
      const linkAdapterStub = { createShortUrl: jest.fn(() => Promise.resolve(Faker.internet.url())) };
      const createShortUrlMock = linkAdapters.createShortUrl.bind({ linkAdapter: linkAdapterStub });
      server.post('/link', { schema: linkRouterSchema }, createShortUrlMock);

      // Act
      await server.ready();
      const response = await server.inject({
        method: 'POST',
        url: '/link',
        body: {
          url: Faker.internet.url(),
        }
      });

      // Asserts
      expect(response.statusCode).toEqual(201);
      expect(typeof response.json().data).toEqual('string');
    });

    it('Post: Without a url param in the body, a valid error object must be returned by the service', async () => {
      // Arrange
      const linkAdapterStub = { createShortUrl: jest.fn(() => Promise.resolve(Faker.internet.url())) };
      const createShortUrlMock = linkAdapters.createShortUrl.bind({ linkAdapter: linkAdapterStub });
      server.post('/link', { schema: linkRouterSchema }, createShortUrlMock);

      // Act
      await server.ready();
      const response = await server.inject({
        method: 'POST',
        url: '/link',
        body: {}
      });

      // Asserts
      expect(response.statusCode).toEqual(400);
      expect(response.json().statusCode).toEqual(400);
      expect(response.json().error).toEqual('Bad Request');
      expect(response.json().message).toEqual("body should have required property 'url'");
    });
  })

  describe('/:hash', () => {
    it('Get: Given a valid hash, a redirect must be done by the service', async () => {
      //Arrange
      const originalUrl = Faker.internet.url()
      const linkAdapterStub = { readUrlByHash: jest.fn(() => Promise.resolve({ originalUrl })) };
      const redirectToUrlMock = linkAdapters.redirectToUrl.bind({ linkAdapter: linkAdapterStub });
      server.get('/:hash', redirectToUrlMock);

      //Act
      await server.ready();
      const response = await server.inject({ method: 'GET', url: '/goodHash' });

      //Assert
      expect(response.statusCode).toBe(302);
      expect(response.headers.location).toBe(originalUrl);
    })

    it('Get: Given an invalid hash, a valid error object must be returned by the service', async () => {
      // Arrange
      const linkAdapterStub = { readUrlByHash: jest.fn(() => Promise.resolve(null)) };
      const redirectToUrlMock = linkAdapters.redirectToUrl.bind({ linkAdapter: linkAdapterStub });
      server.get('/:hash', redirectToUrlMock);

      // Act
      await server.ready();
      const response = await server.inject({ method: 'GET', url: '/badHash' });

      // Asserts
      expect(response.statusCode).toBe(404);
      expect(response.json().statusCode).toBe(404);
      expect(response.json().error).toBe('Not found');
      expect(response.json().message).toBe('Oops, it looks like this url do not exist anymore');
    });
  })
});


