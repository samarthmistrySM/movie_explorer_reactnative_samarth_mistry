import api from './apiConfig.js';

export const getMovies = async (page=1, per_page = 10) => {
  try {
    const response = await api.get(`/api/v1/movies?page=${page}&per_page=${per_page}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching user:', error.response);
    throw error;
  }
};

export const searchMovies = async query => {
  try {
    const response = await api.get(`/api/v1/movies?title=${query}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log('Error searching movies:', error.response);
    throw error;
  }
};

export const filterMovies = async query => {
  try {
    const response = await api.get(`/api/v1/movies?genre=${query}`);
    return response.data;
  } catch (error) {
    console.log('Error filtering movies:', error.response);
    throw error;
  }
};
