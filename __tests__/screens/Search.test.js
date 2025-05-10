import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import Search from '../../src/screens/Search';

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

describe('Search Screen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders correctly', () => {
    const {getByPlaceholderText, getByText} = render(
      <NavigationContainer>
        <Search />
      </NavigationContainer>,
    );

    expect(getByPlaceholderText('Search title or genre')).toBeTruthy();
    expect(getByText('Search')).toBeTruthy();
  });

  it('updates search text and adds to history', () => {
    const {getByPlaceholderText, getByText} = render(
      <NavigationContainer>
        <Search />
      </NavigationContainer>,
    );

    const input = getByPlaceholderText('Search title or genre');
    fireEvent.changeText(input, 'New Action');
    fireEvent(input, 'submitEditing');

    expect(getByText('New Action')).toBeTruthy();
  });

  it('deletes a search history item', () => {
    const {getByText, queryByText, getByTestId} = render(
      <NavigationContainer>
        <Search />
      </NavigationContainer>,
    );

    expect(getByText('Captain')).toBeTruthy();

    const deleteBtn = getByTestId('del-btn-Captain');
    if (deleteBtn) fireEvent.press(deleteBtn);

    expect(queryByText('Captain')).toBeNull();
  });

  it('navigates to Result screen on genre press', () => {
    const {getByText} = render(
      <NavigationContainer>
        <Search />
      </NavigationContainer>,
    );
    fireEvent.press(getByText('Captain'));

    expect(mockNavigate).toHaveBeenCalledWith('Result', {filter: {query: 'Captain', type: 'title'}});
  });
});
