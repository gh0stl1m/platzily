const Faker = require('faker');
const linkAdapters = require('./link');
const { createReqStub, createReplyStub } = require('../../utils/testUtils');

describe('Link Adapters' , () => {
  describe('createShortUrl' , () => {
    it('Given an url in the body, when a short link is created then the function must be return it', async () => {
      // Arrange
      const reqStubs = createReqStub({
        body: {
          url: Faker.internet.url(),
        }
      });
      const replyStubs = createReplyStub();
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
