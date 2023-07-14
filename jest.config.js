/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./src/setupTests.ts'],
};

module.exports = config;
