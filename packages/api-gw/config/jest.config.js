module.exports = {
  preset: '@shelf/jest-mongodb',
  rootDir: '../',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/index.js',
    '!src/utils/constants.js',
    '!src/utils/logger.js',
    '!src/utils/BusinessError.js',
    '!src/utils/index.js',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.js?(x)',
    '<rootDir>/src/**/**/?(*.)(spec|test|integration).js?(x)',
  ],
}
