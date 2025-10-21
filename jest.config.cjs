// jest.config.cjs
/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',

  // Keep your existing TypeScript transform + test tsconfig
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }],
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  // Keep your existing setup
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  // Keep your existing test matching patterns
  testMatch: ['**/__tests__/**/*.test.(ts|tsx)', '**/?(*.)+(test).(ts|tsx)'],

  // Keep your existing mappers (these are good)
  moduleNameMapper: {
    // CSS: identity-obj-proxy is fine for components
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    // Assets: you already point to a TS file mock under src/test — keep it
    '\\.(jpg|jpeg|png|gif|svg|webp|avif)$': '<rootDir>/src/test/__mocks__/fileMock.ts',
    // Source alias
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // === Phase 3: Coverage (report-only) ===
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}',
    '!src/**/__tests__/**',
    '!src/**/types/**',
    '!src/main.tsx',
    '!src/index.tsx',

    // Phase 3: exclude ESM/Vite env files from coverage (to avoid import.meta in CJS)
    '!src/lib/supabaseClient.ts',
    '!src/services/harvard.ts',
    '!src/services/rijksmuseum.ts',
  ],
  coverageReporters: ['text', 'lcov', 'html'],
  coverageDirectory: '<rootDir>/coverage',
  // No thresholds yet (report-only, no CI failures)
};
