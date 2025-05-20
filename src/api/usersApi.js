import api from './apiConfig.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUser = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await api.get(`/api/v1/current_user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
