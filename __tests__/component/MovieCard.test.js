import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import MovieCard from '../../src/components/MovieCard';
import {NavigationContainer} from '@react-navigation/native';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const navigation = jest.requireActual('@react-navigation/native');
  return {
    ...navigation,
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

const mockData = {
  id: '1',
  thumbnail:
    'https://rukminim2.flixcart.com/image/850/1000/poster/8/y/q/athah-poster-captain-america-the-winter-soldier-athdavp0527-original-imadzzz2hvnrajxv.jpeg?q=20&crop=false',
  title: 'Captain America',
  rating: 4.8,
  genre: 'Action',
  category: 'Trending',
  duration: '2h 36min',
  releaseDate: 2000,
};

describe('MovieCard', () => {

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders correctly', () => {
    const {getByText} = render(
      <NavigationContainer>
        <MovieCard movie={mockData} />
      </NavigationContainer>,
    );
    expect(getByText('Captain America')).toBeTruthy();
  });

  it('Navigates to screen when clicked', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <MovieCard movie={mockData} />
      </NavigationContainer>,
    );
    fireEvent.press(getByTestId('movie-card-btn'));
    expect(mockNavigate).toHaveBeenCalledWith('MovieDetails', {movie: mockData});
  });
});
