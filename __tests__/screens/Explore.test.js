import React from 'react';
import {render, waitFor, fireEvent} from '@testing-library/react-native';
import Explore from '../../src/screens/Explore';
import * as movieApi from '../../src/api/movieApi';

jest.mock('react-native-simple-toast', () => ({
  show: jest.fn(),
}));

const mockMovies = Array.from({length: 10}, (_, i) => ({
  id: i.toString(),
  title: `Movie ${i}`,
  posterUrl: `https://example.com/movie${i}.jpg`,
}));

jest.spyOn(movieApi, 'getMovies').mockImplementation(async () => ({
  movies: mockMovies,
}));

describe('Explore Screen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading indicator and then list of movies', async () => {
    const {getByText} = render(<Explore />);
    await waitFor(() => {
      expect(getByText('Explore')).toBeTruthy();
    });
  });

  it('shows "No result found" when movie list is empty', async () => {
    (movieApi.getMovies).mockResolvedValueOnce({movies: []});
    const {getByText} = render(<Explore />);
    await waitFor(() => {
      expect(getByText('No result found')).toBeTruthy();
    });
  });

  it('shows toast on API error', async () => {
    const Toast = require('react-native-simple-toast');
    (movieApi.getMovies).mockRejectedValueOnce(new Error('API Error'));

    render(<Explore />);
    await waitFor(() => {
      expect(Toast.show).toHaveBeenCalledWith('Error fetching movies', Toast.LONG);
    });
  });
});
