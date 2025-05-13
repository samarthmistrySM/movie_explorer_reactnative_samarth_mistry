import api from './apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStripeSessionUrl = async (planType) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await api.post(
      `/api/v1/subscriptions?plan_type=${encodeURIComponent(planType)}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.log('Error getting stripe checkout url', error);
    throw error;
  }
};

export const handleSuccessfulPayment = async (sessionId) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await api.get(`/api/v1/subscriptions/success?session_id=${sessionId}`,{},{
      headers: {
          Authorization: `Bearer ${token}`,
        },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export const fetchUserSubscription = async() => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await api.get(`/api/v1/subscriptions/status`,{
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
