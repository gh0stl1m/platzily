const { buildMockServer, createReqStub, createReplyStub } = require('./testUtils');

describe('Test utils', () => {
  describe('buildMockServer' , () => {
    it('Given a server then the function must mock it', () => {
      // Arrange
      const registeStub = jest.fn();
      const mockedServerInstance = jest.fn(() => ({ register: registeStub }));

      // Act
      buildMockServer(mockedServerInstance, {});

      // Asserts
      expect(mockedServerInstance).toHaveBeenCalled();
      expect(registeStub).toHaveBeenCalled();
    });
  });

  describe('createReqStub', () => {
    it ('Given an mock the function must return the default req mock and the passed object', () => {
      //Arrange
      const mock = { params: 'params' }

      // Act
      const reqStub = createReqStub(mock)

      // Asserts
      expect(typeof reqStub.hostname).toBe('string')
      expect(typeof reqStub.protocol).toBe('string')
      expect(typeof reqStub.log).toBe('object')
      expect(typeof reqStub.log.info).toBe('function')
      expect(reqStub.params).toBe(mock.params)
    })
  })

  describe('createReplyStub', () => {
    it ('Must return an object with code and redirect functions', () => {
      // Act
      const replyStub = createReplyStub()

      // Asserts
      expect(typeof replyStub.code).toBe('function')
      expect(typeof replyStub.redirect).toBe('function')
    })
  })
});
