const Faker = require('faker');
const sanitizers = require('./sanitizers');

describe('sanitizerz', () => {
  describe('errorFieldParser', () => {
    it('Given a valid field, then the function must return a parsed string', () => {
      // Arrange
      const field = Faker.random.word();

      // Act
      const fieldParsed = sanitizers.errorFieldParser(field);

      // Asserts
      expect(fieldParsed).toBe(`FIELD_${field.toUpperCase()}_IS_REQUIRED`);;
    });

    it('Given a not valid field, then the function must throw and error', () => {
      // Asserts
      expect(() => sanitizers.errorFieldParser()).toThrow();
    })
  })
})