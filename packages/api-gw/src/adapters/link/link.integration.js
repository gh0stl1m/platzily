const fastify = require('fastify');
const linkAdapters = require('./link');
const Faker = require('faker')
const { createReqStub, createReplyStub } = require('../../utils/testUtils');

describe('Link Adapters', () => {
  let server;

  beforeEach(async () => {
    server = fastify({});
    const linkAdapterStub = {
      createShortUrl: jest.fn(() => Promise.resolve(Faker.internet.url())),
      readUrlByHash: jest.fn()
    };
    const createShortUrlMock = linkAdapters.createShortUrl.bind({ linkAdapter: linkAdapterStub });
    const redirectToUrlMock = linkAdapters.redirectToUrl.bind({ linkAdapter: linkAdapterStub });

    server.post('/link', createShortUrlMock);
    server.get('/:hash', redirectToUrlMock);

    await server.ready();
  });

  afterEach(async function () {
    if (server) {
      await server.close();
      server = null;
    }
  })

  describe('/link', () => {
    it('Post: Given an url in the body, a shorter url must be returned by the service', async () => {
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
      // Act
      const response = await server.inject({
        method: 'POST',
        url: '/link',
        body: {
          url: null,
        }
      });

      // Asserts
      expect(response.statusCode).toEqual(400);
      expect(response.json().statusCode).toEqual(400);
      expect(response.json().error).toEqual('Bad request');
      expect(response.json().message).toEqual('URL field is required');
    });
  })

  describe('/:hash', () => {
    it('Get: Given an invalid hash, a valid error object must be returned by the service', async () => {
      // Act
      const response = await server.inject({ method: 'GET', url: '/badHash' });

      // Asserts
      expect(response.statusCode).toBe(404);
      expect(response.json().statusCode).toBe(404);
      expect(response.json().error).toBe('Not found');
      expect(response.json().message).toBe('Oops, it looks like this url do not exist anymore');
    });
  })
});


