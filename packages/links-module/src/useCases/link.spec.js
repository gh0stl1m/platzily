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

    it('Given an invalid URL then the fuction must return an error', async() => {
      // Arrange
      const invalidURL = Faker.internet.domainName();
      const hostnameUrl = Faker.internet.url();
      const dependencies = {
        model: { create: jest.fn() },
        idGenerator: { generate: jest.fn() },
      }; 

      // Act
      const shortUrlBuilder = linkUseCases.createShortURL(dependencies);

      // Asserts
      await expect(shortUrlBuilder(invalidURL, hostnameUrl)).rejects.toThrow();
      expect(dependencies.model.create).not.toHaveBeenCalled();
      expect(dependencies.idGenerator.generate).not.toHaveBeenCalled();
    });
  });

  describe('readUrlByhash', () => {
    it('Given a valid hash, then the fuction must return a promise that resolves an URL', async () => {
      // Arrange
      const hash = Faker.random.alpha();
      const linkObject = {
        _id: Faker.random.uuid(),
        hash,
      };

      const dependencies = {
        model: {
          findOne: jest.fn(() => Promise.resolve(linkObject))
        }
      }

      // Act
      const linkReader = linkUseCases.readUrlByHash(dependencies);
      const linkData = await linkReader(hash, { _id: 1, hash: 1 });

      // Asserts
      expect(linkData).toEqual(linkObject);
      expect(dependencies.model.findOne).toHaveBeenCalled();
    });

    it('Given an invalid hash, then the fuction must throw an error', async () => {
      // Arrange
      const dependencies = {
        model: { findOne: jest.fn() },
      }; 

      // Act
      const readerLink = linkUseCases.readUrlByHash(dependencies);

      // Asserts
      await expect(readerLink()).rejects.toThrow();
    });
  });
});
