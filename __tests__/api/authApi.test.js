import * as authApi from '../../src/api/authApi';
import api from '../../src/api/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('../../src/api/apiConfig');
jest.mock('@react-native-async-storage/async-storage');

describe('authApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    it('should register a user and return response data', async () => {
      const mockResponse = { data: { id: 1, name: 'Test User' } };
      api.post.mockResolvedValue(mockResponse);

      const result = await authApi.registerUser('Test User', 'test@example.com', '1234567890', 'password123');

      expect(api.post).toHaveBeenCalledWith('/users', {
        user: {
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
          mobile_number: '1234567890',
        },
      });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('loginUser', () => {
    it('should login a user and return response data', async () => {
      const mockResponse = { data: { token: 'mock-token' } };
      api.post.mockResolvedValue(mockResponse);

      const result = await authApi.loginUser('test@example.com', 'password123');

      expect(api.post).toHaveBeenCalledWith('/users/sign_in', {
        user: {
          email: 'test@example.com',
          password: 'password123',
        },
      });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('logoutUser', () => {
    it('should logout a user and return response data', async () => {
      AsyncStorage.getItem.mockResolvedValue('mock-token');
      const mockResponse = { data: { success: true } };
      api.delete.mockResolvedValue(mockResponse);

      const result = await authApi.logoutUser();

      expect(AsyncStorage.getItem).toHaveBeenCalledWith('token');
      expect(api.delete).toHaveBeenCalledWith('/users/sign_out', {
        headers: {
          Authorization: 'Bearer mock-token',
        },
      });
      expect(result).toEqual(mockResponse.data);
    });
  });
});