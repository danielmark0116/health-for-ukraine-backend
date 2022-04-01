module.exports = {
  clearMocks: true,
  maxWorkers: 1,
  preset: 'ts-jest',
  rootDir: '__tests__',
  setupFilesAfterEnv: [
    './setup/db.ts',
    './setup/mock-server.ts',
    './setup/jestSetup.ts',
    './setup/request.ts',
  ],
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)',
    '!**/__tests__/coverage/**',
    '!**/__tests__/utils/**',
    '!**/__tests__/images/**',
  ],
}
