import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import MovieDetails from '../../src/screens/MovieDetails';
import {NavigationContainer} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useRoute: jest.fn(),
}));

const mockMovie = {
  id: '1',
  title: 'Movie 1',
  genre: 'Action',
  category: 'Trending',
  thumbnail: 'https://example.com/movie1.jpg',
  rating: '4.5',
  releaseDate: '2024-05-01',
  duration: '2h 30m',
};

describe('MovieDetails', () => {
  beforeEach(() => {
    useRoute.mockReturnValue({
      params: {movie: mockMovie},
    });
  });

  it('renders the movie details screen correctly', () => {
    useRoute.mockReturnValue({
      params: {movie: mockMovie},
    });
    const {getByText} = render(
      <NavigationContainer>
        <MovieDetails />
      </NavigationContainer>,
    );

    expect(getByText(mockMovie.title)).toBeTruthy();
    expect(getByText(mockMovie.category)).toBeTruthy();

    expect(getByText(mockMovie.rating)).toBeTruthy();

    expect(getByText(mockMovie.releaseDate)).toBeTruthy();
    expect(getByText(mockMovie.duration)).toBeTruthy();
  });
});
