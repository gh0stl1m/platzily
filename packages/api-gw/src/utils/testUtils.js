const Faker = require('faker')

function buildMockServer(server, plugin) {
  return server().register(plugin);
}

function createReqStub(mock = {}) {
  return {
    protocol: Faker.internet.protocol(),
    hostname: Faker.internet.domainName(),
    log: {
      info: jest.fn(),
    },
    ...mock
  }
}

function createReplyStub() {
  const sendStub = jest.fn();
  const headersStub = jest.fn(() => ({ send: sendStub }));
  const codeReplystub = jest.fn(() => ({ headers: headersStub }))
  const redirectStub = jest.fn();

  return {
    code: codeReplystub,
    redirect: redirectStub
  }
}

module.exports = { buildMockServer, createReqStub, createReplyStub };
