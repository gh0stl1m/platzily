/**
 * Story: Create an strategy that allows to validate if an string is an URL
 * case1: Given an string with an URL format when the validator reads it then it must
 *        return true
 * case2: Given an string with a non-url format when the validator reads it then it must
 *        return false
 */
const Faker = require('faker');
const validators = require('./validators');

describe('Validators', () => {
  describe('isValidURL', () => {
    it('Given a string with an URL format, then the function must return true', () => {
      // Arrange
      const url = Faker.internet.url();

      // Act
      const isValid = validators.isValidURL(url);

      // Asserts
      expect(isValid).toBe(true);
    });

    it('Given a string with a non valid URL format, then the function must return false', () => {
      // Arrange
      const url = Faker.random.alpha();

      // Act
      const isValid = validators.isValidURL(url);

      // Asserts
      expect(isValid).toBe(false);
    });

    it('Given a non string, the the function must return false', () => {
      // Arrange
      const edgeCases = [Faker.random.number(), Faker.random.float(), null, undefined, {}];

      edgeCases.forEach(value => {
        // Act
        const isValid = validators.isValidURL(value);

        // Assert
        expect(isValid).toBe(false);
      });
    });
  });
});