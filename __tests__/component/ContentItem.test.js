import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import ContentItem from '../../src/components/ContentItem';
import {deleteMovie} from '../../src/api/adminApi';
import Toast from 'react-native-simple-toast';
import {Alert} from 'react-native';

jest.mock('../../src/api/adminApi', () => ({
  deleteMovie: jest.fn(),
}));

jest.mock('react-native-simple-toast', () => ({
  show: jest.fn(),
}));

describe('ContentItem', () => {
  const mockMovie = {
    id: 1,
    title: 'Test Movie',
    genre: 'Drama',
    release_year: 2021,
    rating: 8.5,
    director: 'Test Director',
    duration: 120,
    description: 'A test movie description',
    main_lead: 'Test Actor',
    streaming_platform: 'Netflix',
    poster_url: 'https://via.placeholder.com/150',
  };

  const setIsEditModalVisible = jest.fn();
  const setSelectedMovie = jest.fn();
  const update = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders movie title and poster', () => {
    const {getByText, getByTestId} = render(
      <ContentItem
        movie={mockMovie}
        setIsEditModalVisible={setIsEditModalVisible}
        setSelectedMovie={setSelectedMovie}
        update={update}
      />,
    );
    expect(getByText('Test Movie')).toBeTruthy();
    expect(getByTestId('movie-poster')).toBeTruthy();
  });

  it('handles edit button press', () => {
    const {getAllByRole} = render(
      <ContentItem
        movie={mockMovie}
        setIsEditModalVisible={setIsEditModalVisible}
        setSelectedMovie={setSelectedMovie}
        update={update}
      />,
    );

    const buttons = getAllByRole('button');
    fireEvent.press(buttons[0]);

    expect(setIsEditModalVisible).toHaveBeenCalledWith(true);
    expect(setSelectedMovie).toHaveBeenCalledWith(mockMovie);
  });

  it('handles delete button press and confirms delete', async () => {
    deleteMovie.mockResolvedValueOnce({});
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation((title, msg, buttons) => {
      const deleteButton = buttons?.find(btn => btn.text === 'Delete');
      if (deleteButton?.onPress) deleteButton.onPress(); // Simulate user confirming delete
    });

    const {getAllByRole} = render(
      <ContentItem
        movie={mockMovie}
        setIsEditModalVisible={setIsEditModalVisible}
        setSelectedMovie={setSelectedMovie}
        update={update}
      />,
    );

    const buttons = getAllByRole('button');
    fireEvent.press(buttons[1]); // Delete button

    await waitFor(() => {
      expect(deleteMovie).toHaveBeenCalledWith(1);
      expect(Toast.show).toHaveBeenCalledWith('Movie deleted successfully!', Toast.LONG);
      expect(update).toHaveBeenCalled();
    });

    alertSpy.mockRestore();
  });

  it('handles delete API error', async () => {
    deleteMovie.mockRejectedValueOnce(new Error('Delete failed'));

    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation((title, msg, buttons) => {
      const deleteButton = buttons?.find(btn => btn.text === 'Delete');
      if (deleteButton?.onPress) deleteButton.onPress(); // Simulate user confirming delete
    });

    const {getAllByRole} = render(
      <ContentItem
        movie={mockMovie}
        setIsEditModalVisible={setIsEditModalVisible}
        setSelectedMovie={setSelectedMovie}
        update={update}
      />,
    );

    const buttons = getAllByRole('button');
    fireEvent.press(buttons[1]); // Delete button

    await waitFor(() => {
      expect(Toast.show).toHaveBeenCalledWith('Error deleting movie!', Toast.LONG);
    });

    alertSpy.mockRestore();
  });
});
