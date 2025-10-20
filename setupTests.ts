// src/setupTests.ts
import '@testing-library/jest-dom';

// Optional: if your code uses fetch, provide a minimal mock
if (!globalThis.fetch) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  globalThis.fetch = (jest.fn() as unknown) as typeof fetch;
}
