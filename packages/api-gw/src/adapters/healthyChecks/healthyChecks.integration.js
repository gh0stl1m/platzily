const fastify = require('fastify');
const { createReqStub, createReplyStub } = require('../../utils/testUtils');

describe("/status", () => {
  let server;

  beforeEach(async () => {
    server = fastify({});
    const livenessMock = jest.fn(() => ({ status: 'Server Running' }))
    server.get('/status', livenessMock);
    await server.ready();
  });

  afterEach(async function () {
    if (server) {
      await server.close();
      server = null;
    }
  })

  it("GET: Given a request then it must return running", async () => {
    // Act
    const response = await server.inject({ method: "GET", url: "/status" });

    // Assert
    expect(response.statusCode).toEqual(200);
    expect(response.json().status).toEqual('Server Running');
  });
});

