// Import the necessary utilities from React Testing Library
import '@testing-library/jest-dom'; // Adds custom matchers for assertions like toBeInTheDocument()

// Mock for window.matchMedia (required for components that use CSS media queries)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock for console.error to catch React warnings in tests
jest.spyOn(console, 'error').mockImplementation((message) => {
  if (message.includes('React has been loaded more than once')) {
    return;
  }
  throw new Error(message);
});

// Mock window.prompt if used in the app
global.prompt = jest.fn();
