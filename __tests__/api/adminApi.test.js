import * as adminApi from '../../src/api/adminApi';
import api from '../../src/api/apiConfig.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('../../src/api/apiConfig.ts');
jest.mock('@react-native-async-storage/async-storage');

describe('adminApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    AsyncStorage.getItem.mockResolvedValue('mock-token');
  });

  describe('addMovie', () => {
    it('should add a movie and return response data', async () => {
      const mockMovie = new FormData();
      const mockResponse = {data: {id: 1, title: 'Test Movie'}};
      api.post.mockResolvedValue(mockResponse);

      const result = await adminApi.addMovie(mockMovie);

      expect(AsyncStorage.getItem).toHaveBeenCalledWith('token');
      expect(api.post).toHaveBeenCalledWith(
        '/api/v1/movies',
        mockMovie,
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer mock-token',
          }),
        }),
      );
      expect(result).toEqual(mockResponse.data);
    });

    it('should throw an error when api.post fails', async () => {
      const fakeMovie = new FormData();
      const error = new Error('API error');
      AsyncStorage.getItem.mockResolvedValue('test-token');
      api.post.mockRejectedValue(error);

      try {
        await adminApi.addMovie(fakeMovie);
        fail('addMovie did not throw');
      } catch (err) {
        expect(err).toBe(error);
      }
    });
  });

  describe('updateMovie', () => {
    it('should update a movie and return response data', async () => {
      const mockMovie = new FormData();
      const mockResponse = {data: {id: 1, title: 'Updated Movie'}};
      api.patch.mockResolvedValue(mockResponse);

      const result = await adminApi.updateMovie(1, mockMovie);

      expect(AsyncStorage.getItem).toHaveBeenCalledWith('token');
      expect(api.patch).toHaveBeenCalledWith(
        '/api/v1/movies/1',
        mockMovie,
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer mock-token',
          }),
        }),
      );
      expect(result).toEqual(mockResponse.data);
    });

    it('should throw an error when api.patch fails', async () => {
      const fakeMovie = new FormData();
      const error = new Error('API error');
      AsyncStorage.getItem.mockResolvedValue('test-token');
      api.patch.mockRejectedValue(error);

      try {
        await adminApi.updateMovie(fakeMovie);
        fail('updateMovie did not throw');
      } catch (err) {
        expect(err).toBe(error);
      }
    });
  });

  describe('deleteMovie', () => {
    it('should delete a movie and return response data', async () => {
      const mockResponse = {data: {success: true}};
      api.delete.mockResolvedValue(mockResponse);

      const result = await adminApi.deleteMovie(1);

      expect(AsyncStorage.getItem).toHaveBeenCalledWith('token');
      expect(api.delete).toHaveBeenCalledWith(
        '/api/v1/movies/1',
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer mock-token',
          }),
        }),
      );
      expect(result).toEqual(mockResponse.data);
    });

    it('should throw an error when api.delete fails', async () => {
      const error = new Error('API error');
      AsyncStorage.getItem.mockResolvedValue('test-token');
      api.delete.mockRejectedValue(error);

      try {
        await adminApi.deleteMovie(1);
        fail('deleteMovie did not throw');
      } catch (err) {
        expect(err).toBe(error);
      }
    });
  });
});
