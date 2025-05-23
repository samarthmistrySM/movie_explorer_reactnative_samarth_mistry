import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import MovieDetails from '../../src/screens/MovieDetails';
import {NavigationContainer} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import * as movieApi from '../../src/api/movieApi';
import Toast from 'react-native-simple-toast';

jest.spyOn(movieApi, 'filterMovies').mockResolvedValue({
  movies: [{id: 1, title: 'Movie 1'}],
});

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useRoute: jest.fn(),
}));

const mockMovie = {
  id: 1,
  title: 'Captain America',
  genre: 'Action',
  release_year: '2000',
  rating: '4.8',
  director: 'N/A',
  duration: '156',
  description:
    'Captain America is a superhero who fights against evil forces to save the world.',
  premium: false,
  main_lead: 'Chris Evans',
  streaming_platform: 'Disney+',
  poster_url:
    'https://rukminim2.flixcart.com/image/850/1000/poster/8/y/q/athah-poster-captain-america-the-winter-soldier-athdavp0527-original-imadzzz2hvnrajxv.jpeg?q=20&crop=false',
  banner_url:
    'https://rukminim2.flixcart.com/image/850/1000/poster/8/y/q/athah-poster-captain-america-the-winter-soldier-athdavp0527-original-imadzzz2hvnrajxv.jpeg?q=20&crop=false',
};

describe('MovieDetails', () => {
  beforeEach(() => {
    useRoute.mockReturnValue({
      params: {movie: mockMovie},
    });
  });

  it('renders the movie details screen correctly', async () => {
    useRoute.mockReturnValue({
      params: {movie: mockMovie},
    });
    const {getByText, getAllByText} = render(
      <NavigationContainer>
        <MovieDetails />
      </NavigationContainer>,
    );

    await waitFor(() => {
      expect(getAllByText(mockMovie.title)).toBeTruthy();
      expect(getAllByText(mockMovie.rating)).toBeTruthy();
      expect(getByText(mockMovie.release_year)).toBeTruthy();
      expect(getByText(`${mockMovie.duration} min`)).toBeTruthy();
    });
  });

  it('fetches and sets movies', async () => {
    const {getByText} = render(
      <NavigationContainer>
        <MovieDetails />
      </NavigationContainer>,
    );
    await waitFor(() => {
      expect(movieApi.filterMovies).toHaveBeenCalledWith(mockMovie.genre);
      expect(getByText('Movie 1')).toBeTruthy();
    });
  });

  it('shows toast on error', async () => {
    jest
      .spyOn(movieApi, 'filterMovies')
      .mockRejectedValue(new Error('API Error'));
    jest.spyOn(Toast, 'show').mockImplementation(() => {});

    render(
      <NavigationContainer>
        <MovieDetails />
      </NavigationContainer>,
    );
    await waitFor(() => {
      expect(Toast.show).toHaveBeenCalledWith(
        'Error fetching movie',
        Toast.LONG,
      );
    });
  });
});
