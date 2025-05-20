import api from './apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const registerUser = async (name, email, phoneNumber, password) => {
  try {
    const response = await api.post('/users', {
      user: {
        name: name,
        email: email,
        password: password,
        mobile_number: phoneNumber,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/users/sign_in', {
      user: {
        email: email,
        password: password,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  const token = await AsyncStorage.getItem('token');
  try {
    const response = await api.delete('/users/sign_out', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
