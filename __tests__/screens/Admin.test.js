import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import Admin from '../../src/screens/Admin';
import * as movieApi from '../../src/api/movieApi';
import Toast from 'react-native-simple-toast';

jest.mock('../../src/api/movieApi');
jest.mock('react-native-simple-toast', () => ({
  show: jest.fn(),
}));


describe('Admin Screen', () => {
  const moviesMock = [
    {id: 1, title: 'Movie One'},
    {id: 2, title: 'Movie Two'},
  ];

  beforeEach(() => {
    movieApi.getMovies.mockReset();
    Toast.show.mockReset();
  });

  it('renders loading indicator and movies', async () => {
    movieApi.getMovies.mockResolvedValueOnce({
      movies: moviesMock,
      pagination: {total_pages: 2},
    });

    const {getByText, queryByText} = render(<Admin />);
    expect(queryByText('Movie One')).toBeNull();

    await waitFor(() => {
      expect(getByText('Movie One')).toBeTruthy();
      expect(getByText('Movie Two')).toBeTruthy();
    });
  });

  it('handles pagination next and previous', async () => {
    movieApi.getMovies
      .mockResolvedValueOnce({
        movies: moviesMock,
        pagination: {total_pages: 2},
      })
      .mockResolvedValueOnce({
        movies: moviesMock,
        pagination: {total_pages: 2},
      });

    const {getByText, getByTestId} = render(<Admin />);
    await waitFor(() => getByText('Movie One'));

    const rightChevron = getByTestId('rightButton');
    fireEvent.press(rightChevron);

    await waitFor(() => expect(movieApi.getMovies).toHaveBeenCalledWith(2, 5));

    const leftChevron = getByTestId('leftButton');
    fireEvent.press(leftChevron);

    await waitFor(() => expect(movieApi.getMovies).toHaveBeenCalledWith(1, 5));
  });

  it('shows Toast when no more pages', async () => {
    movieApi.getMovies.mockResolvedValue({
      movies: moviesMock,
      pagination: {total_pages: 1},
    });

    const {getByText, getByTestId} = render(<Admin />);
    await waitFor(() => getByText('Movie One'));

    const rightChevron = getByTestId('rightButton');
    fireEvent.press(rightChevron);

    expect(Toast.show).toHaveBeenCalledWith(
      'No more pages available!',
      Toast.LONG,
    );
  });

  it('shows Toast on API error', async () => {
    movieApi.getMovies.mockRejectedValue(new Error('fail'));

    render(<Admin />);
    await waitFor(() =>
      expect(Toast.show).toHaveBeenCalledWith(
        'Error fetching movie',
        Toast.LONG,
      ),
    );
  });

});
