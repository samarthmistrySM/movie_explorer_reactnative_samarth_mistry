import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import WatchList from '../../src/screens/WatchList';
import {NavigationContainer} from '@react-navigation/native';

describe('WatchList', () => {
  it('renders the WatchList screen correctly', () => {
    const {getByText} = render(
      <NavigationContainer>
        <WatchList />
      </NavigationContainer>,
    );

    expect(getByText('My Watchlist')).toBeTruthy();
  });
});
