import api from './apiConfig.ts';

export const getMovies = async (page = 1, per_page = 10) => {
  try {
    const response = await api.get(
      `/api/v1/movies?page=${page}&per_page=${per_page}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchMovies = async (query: string) => {
  try {
    const response = await api.get(`/api/v1/movies?title=${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const filterMovies = async (query: string) => {
  try {
    const response = await api.get(`/api/v1/movies?genre=${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
