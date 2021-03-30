const { createError } = require('./errorHandling');

describe('Test utils', () => {
  describe('createError' , () => {
    it('Given a complete error object then the function must return all error values', () => {
      // Arrange
      const statusCodeMock = 400
      const errorMock = 'Bad request'
      const messageMock = 'Mock message'
      const errorObjMock = {
          statusCode: statusCodeMock,
          error: errorMock,
          message: messageMock
        }

        // Act
        const error = createError(errorObjMock);

        // Asserts
        expect(error.statusCode).toBe(statusCodeMock);
        expect(error.error).toBe(errorMock);
        expect(error.message).toBe(messageMock);
    });

    it('Given an incomplete error object the function must return the passed values and the default ones', () => {
        // Arrange
        const messageMock = 'Mock message'

        // Act
        const error = createError({ message: messageMock });

        // Asserts
        expect(error.statusCode).toBe(500);
        expect(error.error).toBe('Internal Server Error');
        expect(error.message).toBe(messageMock);
    })
  });
});