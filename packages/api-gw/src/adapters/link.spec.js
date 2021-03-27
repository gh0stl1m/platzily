const Faker = require('faker');
const linkAdapters = require('./link');

describe('Link Adapters' , () => {
  describe('createShortUrl' , () => {
    it('Given an url in the body, when a short link is created then the function must be return it', async () => {
      // Arrange
      const reqStubs = {
        protocol: Faker.internet.protocol(),
        hostname: Faker.internet.domainName(),
        log: {
          info: jest.fn(),
        }, 
        body: {
          url: Faker.internet.url(),
        }
      };
      const sendStub = jest.fn(() => ({ data: Faker.internet.url() }));
      const headersStub = jest.fn(() => ({ send: sendStub }));
      const codeReplystub = jest.fn(() => ({ headers: headersStub }))
      const replyStubs = {
        code: codeReplystub, 
      };
      const linkAdapterStub = {
        createShortUrl: jest.fn(),
      }

      // Act
      const createShortUrBinded = linkAdapters.createShortUrl
        .bind({ linkAdapter: linkAdapterStub });
      await createShortUrBinded(reqStubs, replyStubs);
      
      // Asserts
      expect(reqStubs.log.info).toHaveBeenCalled();
      expect(replyStubs.code).toHaveBeenCalledWith(201);
      expect((replyStubs.code()).headers).toHaveBeenCalled();
      expect(((replyStubs.code()).headers()).send).toHaveBeenCalled();
    });
  });
});
