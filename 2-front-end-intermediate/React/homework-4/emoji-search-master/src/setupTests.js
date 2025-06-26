// Setup file for tests
// Mock clipboard for testing
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

// Mock Clipboard constructor for the Clipboard library
global.Clipboard = jest.fn().mockImplementation(() => ({
  destroy: jest.fn(),
  on: jest.fn(),
}));
