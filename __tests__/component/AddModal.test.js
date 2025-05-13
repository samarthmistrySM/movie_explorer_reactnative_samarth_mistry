import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import AddModal from '../../src/components/AddModal';
import * as api from '../../src/api/adminApi';

jest.mock('react-native-simple-toast', () => ({
  show: jest.fn(),
}));

jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(),
}));

describe('AddModal', () => {
  const handleModalClose = jest.fn();
  const update = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

it('renders correctly when modal is open', () => {
    const {getByText} = render(
      <AddModal
        isModalOpen={true}
        handleModalClose={handleModalClose}
        update={update}
      />,
    );

    expect(getByText('Add New Movie')).toBeTruthy();
    expect(getByText('Add Movie')).toBeTruthy();
  });

  it('fills out and submits the form', async () => {
    const mockAddMovie = jest
      .spyOn(api, 'addMovie')
      .mockResolvedValue({data: 'Movie added successfully'});

    const {getByPlaceholderText, getByText} = render(
      <AddModal
        isModalOpen={true}
        handleModalClose={handleModalClose}
        update={update}
      />,
    );

    fireEvent.changeText(getByPlaceholderText('Enter movie title'), 'Inception');
    fireEvent.changeText(getByPlaceholderText('Genre (e.g. Action, Drama)'), 'Sci-Fi');
    fireEvent.changeText(getByPlaceholderText('Enter release year'), '2010');
    fireEvent.changeText(getByPlaceholderText('Enter rating (1-10)'), '8.8');
    fireEvent.changeText(getByPlaceholderText('Enter director name'), 'Christopher Nolan');
    fireEvent.changeText(getByPlaceholderText('Duration in minutes'), '148');
    fireEvent.changeText(getByPlaceholderText('Enter main actor/actress'), 'Leonardo DiCaprio');
    fireEvent.changeText(getByPlaceholderText('Movie description'), 'A mind-bending thriller.');

    fireEvent.press(getByText('Add Movie'));

    await waitFor(() => {
      expect(mockAddMovie).toHaveBeenCalled();
      expect(handleModalClose).toHaveBeenCalled();
      expect(update).toHaveBeenCalled();
    });
  });

  it('calls handleModalClose when cancel is pressed', () => {
    const {getByText} = render(
      <AddModal
        isModalOpen={true}
        handleModalClose={handleModalClose}
        update={update}
      />,
    );

    fireEvent.press(getByText('Cancel'));

    expect(handleModalClose).toHaveBeenCalled();
  });
});
