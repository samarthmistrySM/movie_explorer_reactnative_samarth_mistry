import '@testing-library/jest-native/extend-expect';

jest.mock('react-native-gesture-handler', () => {
  return {
    GestureHandlerRootView: ({children}) => children,
    Swipeable: jest.fn(),
    DrawerLayout: jest.fn(),
  };
});

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock('react-native-simple-toast', () => ({
  show: jest.fn(), 
}));