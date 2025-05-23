import * as usersApi from '../../src/api/usersApi.ts';
import api from '../../src/api/apiConfig.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('../../src/api/apiConfig.ts');
jest.mock('@react-native-async-storage/async-storage');

describe('usersApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    AsyncStorage.getItem.mockResolvedValue('mock-token');
  });

  describe('getUser', () => {
    it('should fetch current user and return response data', async () => {
      const mockResponse = { data: { id: 1, name: 'Test User' } };
      api.get.mockResolvedValue(mockResponse);

      const result = await usersApi.getUser();

      expect(AsyncStorage.getItem).toHaveBeenCalledWith('token');
      expect(api.get).toHaveBeenCalledWith('/api/v1/current_user', {
        headers: {
          Authorization: 'Bearer mock-token',
        },
      });
      expect(result).toEqual(mockResponse.data);
    });

    it('should throw an error when api.get fails', async () => {
      const error = new Error('API error');
      AsyncStorage.getItem.mockResolvedValue('test-token');
      api.get.mockRejectedValue(error);

      try {
        await usersApi.getUser();
        fail('getUser did not throw');
      } catch (err) {
        expect(err).toBe(error);
      }
    });
  });
});