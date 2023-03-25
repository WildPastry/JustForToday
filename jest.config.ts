/* eslint-disable max-len */
import type { Config } from 'jest';
import { defaults } from 'jest-config';

const config: Config = {
  moduleFileExtensions: [
    ...defaults.moduleFileExtensions,
    'mts',
    'ts',
    'tsx',
    'js',
    'jsx'
  ],
  preset: 'react-native',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/babel.config.js',
    '!**/jest.setup.js'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)'
  ]
};

export default config;
