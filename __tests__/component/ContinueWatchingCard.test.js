import React from 'react';
import {render} from '@testing-library/react-native';
import ContinueWatchingCard from '../../src/components/ContinueWatchingCard';

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

describe('ContinueWatchingCard', () => {
  it('renders correctly', () => {
    const {getByText} = render(<ContinueWatchingCard movie={mockData} />);
    expect(getByText('Captain America')).toBeTruthy();
  });
});
