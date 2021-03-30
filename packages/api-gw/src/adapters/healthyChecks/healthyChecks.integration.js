const fastify = require('fastify');
const { buildMockServer } = require('../../utils/testUtils');
const statusRouter = require('../../delivery/http/routes/status');

describe("/status", () => {
  let server;

  beforeEach(async () => {
    server =  fastify({});
    server.register(statusRouter);
    await server.ready();
  });

  it("GET: Given a request then it must return running", async () => {
    const response = await server.inject({ method: "GET", url: "/" });
    expect(response.statusCode).toEqual(200);
    expect(response.json().status).toEqual('Server Running');
  });
});

