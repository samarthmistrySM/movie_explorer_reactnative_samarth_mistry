module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    '<rootDir>/jest.setup.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-linear-gradient|react-native-element-dropdown)|react-native-simple-toast/)',
  ],
  testMatch: ['**/__tests__/**/*.test.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  coverageDirectory: './coverage',
  coverageReporters: ['text', 'lcov', 'json'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx,json}',
    '!src/**/*.d.ts',
    '!src/context/**',
    "!src/navigation/**",
    "!src/Types.ts"
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__tests__/__mocks__/fileMock.js',
  },
};