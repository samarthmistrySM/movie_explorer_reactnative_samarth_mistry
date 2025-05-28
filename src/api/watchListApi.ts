import api from './apiConfig.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getMovies = async () => {
  try {
    const token = await AsyncStorage.getItem('token');

    const response = await api.get(
      `api/v1/wishlists`,
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

export const addMovie = async (id: number) => {
  try {
    const token = await AsyncStorage.getItem('token');

    const response = await api.post(
      `api/v1/wishlists`,
      {
        wishlist: {
          movie_id: id,
        },
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

export const removeMovie = async (id: number) => {
  try {
    const token = await AsyncStorage.getItem('token');

    const response = await api.delete(
      `api/v1/wishlists/${id}`,
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
