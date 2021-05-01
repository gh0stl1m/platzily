const { buildMockServer } = require('./testUtils');

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
});
