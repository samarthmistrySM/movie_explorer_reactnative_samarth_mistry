import * as paymentApi from '../../src/api/paymentApi';
import api from '../../src/api/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('../../src/api/apiConfig');
jest.mock('@react-native-async-storage/async-storage');

describe('paymentApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    AsyncStorage.getItem.mockResolvedValue('mock-token');
  });

  describe('getStripeSessionUrl', () => {
    it('should get stripe session url for a plan type', async () => {
      const mockResponse = {data: {url: 'https://stripe.com/session'}};
      api.post.mockResolvedValue(mockResponse);

      const result = await paymentApi.getStripeSessionUrl('premium');

      expect(AsyncStorage.getItem).toHaveBeenCalledWith('token');
      expect(api.post).toHaveBeenCalledWith(
        '/api/v1/subscriptions?plan_type=premium',
        {},
        {
          headers: {
            Authorization: 'Bearer mock-token',
          },
        },
      );
      expect(result).toBe(mockResponse);
    });

    it('should throw an error when api.post fails', async () => {
      const fakePlanType = '';
      const error = new Error('API error');
      AsyncStorage.getItem.mockResolvedValue('test-token');
      api.post.mockRejectedValue(error);

      try {
        await paymentApi.getStripeSessionUrl(fakePlanType);
        fail('getStripeSessionUrl did not throw');
      } catch (err) {
        expect(err).toBe(error);
      }
    });
  });

  describe('handleSuccessfulPayment', () => {
    it('should handle successful payment and return response', async () => {
      const mockResponse = {data: {success: true}};
      api.get.mockResolvedValue(mockResponse);

      const result = await paymentApi.handleSuccessfulPayment('session-123');

      expect(AsyncStorage.getItem).toHaveBeenCalledWith('token');
      expect(api.get).toHaveBeenCalledWith(
        '/api/v1/subscriptions/success?session_id=session-123',
        {
          headers: {
            Authorization: 'Bearer mock-token',
          },
        },
      );
      expect(result).toBe(mockResponse);
    });

    it('should throw an error when api.get fails', async () => {
      const fakeSesssionId = '';
      const error = new Error('API error');
      AsyncStorage.getItem.mockResolvedValue('test-token');
      api.get.mockRejectedValue(error);

      try {
        await paymentApi.handleSuccessfulPayment(fakeSesssionId);
        fail('getStripeSessionUrl did not throw');
      } catch (err) {
        expect(err).toBe(error);
      }
    });
  });

  describe('fetchUserSubscription', () => {
    it('should fetch user subscription status and return response data', async () => {
      const mockResponse = {data: {active: true, plan: 'premium'}};
      api.get.mockResolvedValue(mockResponse);

      const result = await paymentApi.fetchUserSubscription();

      expect(AsyncStorage.getItem).toHaveBeenCalledWith('token');
      expect(api.get).toHaveBeenCalledWith('/api/v1/subscriptions/status', {
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
        await paymentApi.fetchUserSubscription();
        fail('getStripeSessionUrl did not throw');
      } catch (err) {
        expect(err).toBe(error);
      }
    });
  });
});
