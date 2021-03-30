const Faker = require('faker');
const hashAdapters = require('./hash');
const { createReqStub, createReplyStub } = require('../../utils/testUtils');

describe('Hash Adapters' , () => {
  describe('redirectToUrl', () => {
    it('Given a valid hash the function must redirect to the resulting url', async () => {
      // Arrange
      const reqStubs = createReqStub({
        params: {
          hash: Faker.random.uuid()
        }
      });
      const replyStubs = createReplyStub();
      const linkAdapterStub = {
        readUrlByHash: jest.fn(() => Promise.resolve({ originalUrl: Faker.internet.url() })),
      }

      // Act
      const readUrlByHashBinded = hashAdapters.redirectToUrl
        .bind({ linkAdapter: linkAdapterStub });
      await readUrlByHashBinded(reqStubs, replyStubs);

       // Asserts
       expect(reqStubs.log.info).toHaveBeenCalled();
       expect((replyStubs.redirect)).toHaveBeenCalled();
    })

    it('Given an invalid hash the function must return a 404 error', async () => {
       // Arrange
       const reqStubs = createReqStub({
        params: {
          hash: Faker.random.uuid()
        }
      });
      const replyStubs = createReplyStub();
      const linkAdapterStub = {
        readUrlByHash: jest.fn(() => Promise.resolve(null)),
      }

      // Act
      const readUrlByHashBinded = hashAdapters.redirectToUrl
        .bind({ linkAdapter: linkAdapterStub });
      await readUrlByHashBinded(reqStubs, replyStubs);

      // Asserts
      expect(reqStubs.log.info).toHaveBeenCalled();
      expect(replyStubs.code).toHaveBeenCalledWith(404);
      expect((replyStubs.code()).headers).toHaveBeenCalled();
      expect(((replyStubs.code()).headers()).send).toHaveBeenCalledWith({
        statusCode: 404,
        error: "Not found",
        message: "Oops, it looks like this url do not exist anymore"
      });
    })
  })
});
