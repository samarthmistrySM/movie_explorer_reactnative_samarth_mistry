import * as notificationApi from '../../src/api/notificationApi';
import api from '../../src/api/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('../../src/api/apiConfig');
jest.mock('@react-native-async-storage/async-storage');

describe('notificationApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    AsyncStorage.getItem.mockResolvedValue('mock-token');
  });

  describe('updateDeviceToken', () => {
    it('should update device token and return response data', async () => {
      const mockResponse = { data: { success: true } };
      api.post.mockResolvedValue(mockResponse);

      const result = await notificationApi.updateDeviceToken('fcm-token-123');

      expect(AsyncStorage.getItem).toHaveBeenCalledWith('token');
      expect(api.post).toHaveBeenCalledWith(
        '/api/v1/update_device_token',
        { device_token: 'fcm-token-123' },
        {
          headers: {
            Authorization: 'Bearer mock-token',
          },
        }
      );
      expect(result).toEqual(mockResponse.data);
    });
  });
});