const healthCheck = require('./healthyChecks');

describe('HealthCheck Adapters', () => {
  describe('liveness', () => {
    it('Given a request then it must return running' , async () => {
      // Act
      const response = await healthCheck.liveness();

      // Asserts
      expect(response).toEqual({ status: 'Server Running' });
    });
  });
});
