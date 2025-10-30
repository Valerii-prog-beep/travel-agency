// jest.setup.ts
import '@testing-library/jest-dom';

// Просто создаем мок для alert без объявления типа
global.alert = jest.fn();

// Мок для matchMedia
window.matchMedia = jest.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));

// Уберите ResizeObserver если не нужен, или оставьте так:
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));