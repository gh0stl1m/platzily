const Faker = require('faker');
const linkUseCases = require('./link');

describe('Link Use Cases', () => {
  describe('createShortURL', () => {
    it('Given a validURL then the function must return a short URL', async () => {
      // Arrange
      const originalUrl = Faker.internet.url();
      const fullHostnameURL = Faker.internet.url();
      const hash = Faker.random.uuid();
      const linkObjectModel = {
        _id: Faker.random.uuid,
        originalUrl,
        hash,
      };
      const dependencies = {
        model: { create: jest.fn(() => Promise.resolve(linkObjectModel))},
        idGenerator: { generate: jest.fn(() => hash)}
      }

      // Act
      const shortUrlBuilder = linkUseCases.createShortURL(dependencies);
      const shortUrl = await shortUrlBuilder(originalUrl, fullHostnameURL);

      // Assert
      expect(shortUrl).toBe(`${fullHostnameURL}/${hash}`);
      expect(dependencies.model.create).toHaveBeenCalledWith({
        originalUrl,
        hash,
      });
      expect(dependencies.idGenerator.generate).toHaveBeenCalledWith()
    });
  });
})