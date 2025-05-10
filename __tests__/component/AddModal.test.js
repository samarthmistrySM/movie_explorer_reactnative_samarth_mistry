import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import AddModal from '../../src/components/AddModal';
import {addMovie} from '../../src/api/adminApi';

jest.mock('../../src/api/adminApi', () => ({
  addMovie: jest.fn(),
}));

describe('AddModal', () => {
  const handleModalClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all input fields and buttons', () => {
    const {getByPlaceholderText, getByText} = render(
      <AddModal isModalOpen={true} handleModalClose={handleModalClose} />
    );

    expect(getByPlaceholderText('Enter movie title')).toBeTruthy();
    expect(getByPlaceholderText('Genre (e.g. Action, Drama)')).toBeTruthy();
    expect(getByPlaceholderText('Enter release year')).toBeTruthy();
    expect(getByPlaceholderText('Enter rating (1-10)')).toBeTruthy();
    expect(getByPlaceholderText('Enter director name')).toBeTruthy();
    expect(getByPlaceholderText('Duration in minutes')).toBeTruthy();
    expect(getByPlaceholderText('Enter main actor/actress')).toBeTruthy();
    expect(getByPlaceholderText('Where to watch')).toBeTruthy();
    expect(getByPlaceholderText('Movie description')).toBeTruthy();
    expect(getByText('Add Movie')).toBeTruthy();
    expect(getByText('Cancel')).toBeTruthy();
  });

  it('calls addMovie API and closes modal on success', async () => {
    (addMovie).mockResolvedValueOnce({});

    const {getByPlaceholderText, getByText} = render(
      <AddModal isModalOpen={true} handleModalClose={handleModalClose} />
    );

    fireEvent.changeText(getByPlaceholderText('Enter movie title'), 'Inception');
    fireEvent.changeText(getByPlaceholderText('Genre (e.g. Action, Drama)'), 'Sci-Fi');
    fireEvent.changeText(getByPlaceholderText('Enter release year'), '2010');
    fireEvent.changeText(getByPlaceholderText('Enter rating (1-10)'), '8.8');
    fireEvent.changeText(getByPlaceholderText('Enter director name'), 'Christopher Nolan');
    fireEvent.changeText(getByPlaceholderText('Duration in minutes'), '148');
    fireEvent.changeText(getByPlaceholderText('Enter main actor/actress'), 'Leonardo DiCaprio');
    fireEvent.changeText(getByPlaceholderText('Where to watch'), 'Netflix');
    fireEvent.changeText(getByPlaceholderText('Movie description'), 'Dreams within dreams.');

    fireEvent.press(getByText('Add Movie'));

    await waitFor(() => {
      expect(addMovie).toHaveBeenCalledWith({
        title: 'Inception',
        genre: 'Sci-Fi',
        release_year: '2010',
        rating: '8.8',
        director: 'Christopher Nolan',
        duration: '148',
        description: 'Dreams within dreams.',
        main_lead: 'Leonardo DiCaprio',
        streaming_platform: 'Netflix',
      });
      expect(handleModalClose).toHaveBeenCalled();
    });
  });

  it('shows error toast on failure', async () => {
    (addMovie).mockRejectedValueOnce(new Error('API failure'));

    const {getByPlaceholderText, getByText} = render(
      <AddModal isModalOpen={true} handleModalClose={handleModalClose} />
    );

    fireEvent.changeText(getByPlaceholderText('Enter movie title'), 'Interstellar');
    fireEvent.press(getByText('Add Movie'));

    await waitFor(() => {
      expect(addMovie).toHaveBeenCalled();
      expect(handleModalClose).not.toHaveBeenCalled();
    });
  });
});
