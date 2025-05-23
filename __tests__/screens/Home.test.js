import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Home from '../../src/screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import * as movieApi from '../../src/api/movieApi';

jest.mock('../../src/components/UserDetails.tsx', () => 'UserDetails');
jest.mock('../../src/components/MovieCard', () => 'MovieCard');
jest.mock('../../src/components/ContinueWatchingCard.tsx', () => 'ContinueWatchingCard');
jest.mock('../../src/components/MovieCardLoading.tsx', () => 'MovieCardLoading');
jest.mock('react-native-simple-toast', () => ({
  show: jest.fn(),
  LONG: 1,
}));

describe('Home Screen', () => {
  beforeEach(() => {
    jest.spyOn(movieApi, 'getMovies').mockResolvedValue({
      movies: [
        { id: 1, title: 'Movie 1', rating: 5, release_year: 2022 },
        { id: 2, title: 'Movie 2', rating: 8, release_year: 2024 },
        { id: 3, title: 'Movie 3', rating: 7, release_year: 2023 },
      ],
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('renders the labels and initial UI', async () => {
    const { getByText } = render(
      <NavigationContainer>
        <Home />
      </NavigationContainer>
    );
    await waitFor(() => {
      expect(getByText('Top Rated')).toBeTruthy();
      expect(getByText('Latest by year')).toBeTruthy();
      expect(getByText('Continue Watching')).toBeTruthy();
      expect(getByText('Dune: Part Two')).toBeTruthy();
    });
  });

  it('filters movies by label', async () => {
    const { getByTestId, getByText } = render(
      <NavigationContainer>
        <Home />
      </NavigationContainer>
    );
    const label0 = getByTestId('label-0'); 
    const label1 = getByTestId('label-1'); 
    await waitFor(() => {
      const style0 = Array.isArray(label0.props.style) ? label0.props.style : [label0.props.style];
      expect(style0).toEqual(
        expect.arrayContaining([expect.objectContaining({ backgroundColor: '#FF3B30' })])
      );
    });
    fireEvent.press(getByText('Latest by year'));
    await waitFor(() => {
      const style1 = Array.isArray(label1.props.style) ? label1.props.style : [label1.props.style];
      expect(style1).toEqual(
        expect.arrayContaining([expect.objectContaining({ backgroundColor: '#FF3B30' })])
      );
    });
  });

  it('shows toast on error', async () => {
    jest.spyOn(movieApi, 'getMovies').mockRejectedValueOnce(new Error('API Error'));
    const toastSpy = jest.spyOn(Toast, 'show');
    render(
      <NavigationContainer>
        <Home />
      </NavigationContainer>
    );
    await waitFor(() => {
      expect(toastSpy).toHaveBeenCalledWith('Error fetching movie', Toast.LONG);
    });
  });
});