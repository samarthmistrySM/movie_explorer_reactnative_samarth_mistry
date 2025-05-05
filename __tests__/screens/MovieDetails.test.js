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
  id: 1,
  title: 'Captain America',
  genre: 'Action',
  release_year: "2000",
  rating: "4.8",
  director: 'N/A',
  duration: "156",
  description:
    'Captain America is a superhero who fights against evil forces to save the world.',
  premium: true,
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

  it('renders the movie details screen correctly', () => {
    useRoute.mockReturnValue({
      params: {movie: mockMovie},
    });
    const {getByText,getAllByText} = render(
      <NavigationContainer>
        <MovieDetails />
      </NavigationContainer>,
    );

    expect(getAllByText(mockMovie.title)).toBeTruthy();

    expect(getAllByText(mockMovie.rating)).toBeTruthy();

    expect(getByText(mockMovie.release_year)).toBeTruthy();
    expect(getByText(mockMovie.duration)).toBeTruthy();
  });
});
