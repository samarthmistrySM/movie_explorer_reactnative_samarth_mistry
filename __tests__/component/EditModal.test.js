import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import EditModal from '../../src/components/EditModal';
import { updateMovie } from '../../src/api/adminApi';
import Toast from 'react-native-simple-toast';

jest.mock('../../src/api/adminApi', () => ({
  updateMovie: jest.fn(),
}));

jest.mock('react-native-simple-toast', () => ({
  show: jest.fn(),
}));

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
};

describe('EditModal', () => {
  const handleModalClose = jest.fn();
  const update = jest.fn();

  it('renders the modal with movie data and updates it', async () => {
    const { getByPlaceholderText, getByText } = render(
      <EditModal
        isModalOpen={true}
        handleModalClose={handleModalClose}
        movie={mockMovie}
        update={update}
      />
    );

    expect(getByPlaceholderText('Enter movie title').props.value).toBe('Test Movie');

    fireEvent.changeText(getByPlaceholderText('Enter movie title'), 'Updated Movie Title');

    fireEvent.press(getByText('Update Movie'));

    await waitFor(() => {
      expect(updateMovie).toHaveBeenCalledWith(
        expect.objectContaining({ title: 'Updated Movie Title' })
      );
      expect(Toast.show).toHaveBeenCalledWith('Movie updated successfully!', Toast.LONG);
      expect(update).toHaveBeenCalled();
      expect(handleModalClose).toHaveBeenCalled();
    });
  });

  it('handles updateMovie error', async () => {
    (updateMovie).mockRejectedValueOnce(new Error('Update failed'));

    const { getByText } = render(
      <EditModal
        isModalOpen={true}
        handleModalClose={handleModalClose}
        movie={mockMovie}
        update={update}
      />
    );

    fireEvent.press(getByText('Update Movie'));

    await waitFor(() => {
      expect(Toast.show).toHaveBeenCalledWith('Error updating movie!', Toast.LONG);
    });
  });
});
