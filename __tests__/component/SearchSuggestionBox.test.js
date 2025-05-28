import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SearchSuggestionBox from '../../src/components/SearchSuggestionBox';

const mockMovies = [
  { id: 1, title: 'Inception' },
  { id: 2, title: 'Interstellar' },
];

describe('SearchSuggestionBox', () => {
  it('renders nothing if suggestions is empty', () => {
    const { toJSON } = render(
      <SearchSuggestionBox suggestions={[]} onSelect={jest.fn()} />
    );
    expect(toJSON()).toBeNull();
  });

  it('renders a list of suggestions', () => {
    const { getByText } = render(
      <SearchSuggestionBox suggestions={mockMovies} onSelect={jest.fn()} />
    );
    expect(getByText('Inception')).toBeTruthy();
    expect(getByText('Interstellar')).toBeTruthy();
  });

  it('calls onSelect with correct movie when a suggestion is pressed', () => {
    const onSelect = jest.fn();
    const { getByText } = render(
      <SearchSuggestionBox suggestions={mockMovies} onSelect={onSelect} />
    );
    fireEvent.press(getByText('Interstellar'));
    expect(onSelect).toHaveBeenCalledWith(mockMovies[1]);
  });
});