import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^react-router-dom$': '<rootDir>/node_modules/react-router-dom',
  },
};

export default config;