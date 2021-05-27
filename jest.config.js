module.exports = {
  roots: ['<rootDir>/src'],
  verbose: true,
  clearMocks: true,
  testMatch: ['**/?(*.)+(test).[jt]s?(x)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '\\.(js|jsx)?$': 'babel-jest',
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['<rootDir>/src/setupEnzyme.ts'],
  globals: {
    PUBLIC_PATH: '/grocmart/',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|styl)$': '<rootDir>/__mocks__/styleMock.js',
  },
};
