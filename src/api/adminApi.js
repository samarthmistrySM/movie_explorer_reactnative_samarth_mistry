import api from './apiConfig.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const addMovie = async movie => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    
    const response = await api.post(
      `/api/v1/movies`,movie,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateMovie = async movie => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await api.patch(
      `/api/v1/movies/${movie.id}`,
      {
        movie: movie,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteMovie = async id => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await api.delete(`/api/v1/movies/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
