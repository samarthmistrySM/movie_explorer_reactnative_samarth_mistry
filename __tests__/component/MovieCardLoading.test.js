import React from 'react';
import {render} from '@testing-library/react-native';
import MovieCardLoading from '../../src/components/MovieCardLoading';

describe('MovieCardLoading', () => {

  it('renders MovieCardLoading correctly', () => {
    const loadingCard = render(<MovieCardLoading />);

    expect(loadingCard).toBeTruthy();
  });

});
