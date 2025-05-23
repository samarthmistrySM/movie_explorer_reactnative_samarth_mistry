import * as movieApi from '../../src/api/movieApi.ts';
import api from '../../src/api/apiConfig.ts';

jest.mock('../../src/api/apiConfig.ts');

describe('movieApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getMovies', () => {
    it('should fetch movies with default params and return response data', async () => {
      const mockResponse = { data: [{ id: 1, title: 'Movie 1' }] };
      api.get.mockResolvedValue(mockResponse);

      const result = await movieApi.getMovies();

      expect(api.get).toHaveBeenCalledWith('/api/v1/movies?page=1&per_page=10');
      expect(result).toEqual(mockResponse.data);
    });

    it('should fetch movies with custom params and return response data', async () => {
      const mockResponse = { data: [{ id: 2, title: 'Movie 2' }] };
      api.get.mockResolvedValue(mockResponse);

      const result = await movieApi.getMovies(2, 5);

      expect(api.get).toHaveBeenCalledWith('/api/v1/movies?page=2&per_page=5');
      expect(result).toEqual(mockResponse.data);
    });

    it('should throw an error when api.get fails', async () => {
      const error = new Error('API error');
      api.get.mockRejectedValue(error);

      try {
        await movieApi.getMovies();
        fail('getMovies did not throw');
      } catch (err) {
        expect(err).toBe(error);
      }
    });
  });

  describe('searchMovies', () => {
    it('should search movies by title and return response data', async () => {
      const mockResponse = { data: [{ id: 3, title: 'Test Movie' }] };
      api.get.mockResolvedValue(mockResponse);

      const result = await movieApi.searchMovies('Test');

      expect(api.get).toHaveBeenCalledWith('/api/v1/movies?title=Test');
      expect(result).toEqual(mockResponse.data);
    });

    it('should throw an error when api.get fails', async () => {
      const error = new Error('API error');
      api.get.mockRejectedValue(error);

      try {
        await movieApi.searchMovies();
        fail('searchMovies did not throw');
      } catch (err) {
        expect(err).toBe(error);
      }
    });
  });

  describe('filterMovies', () => {
    it('should filter movies by genre and return response data', async () => {
      const mockResponse = { data: [{ id: 4, title: 'Genre Movie' }] };
      api.get.mockResolvedValue(mockResponse);

      const result = await movieApi.filterMovies('Action');

      expect(api.get).toHaveBeenCalledWith('/api/v1/movies?genre=Action');
      expect(result).toEqual(mockResponse.data);
    });

    it('should throw an error when api.get fails', async () => {
      const error = new Error('API error');
      api.get.mockRejectedValue(error);

      try {
        await movieApi.filterMovies();
        fail('filterMovies did not throw');
      } catch (err) {
        expect(err).toBe(error);
      }
    });
  });
});