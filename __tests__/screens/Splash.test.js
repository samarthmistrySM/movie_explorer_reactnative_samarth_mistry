import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import Splash from '../../src/screens/Splash';
import {NavigationContainer} from '@react-navigation/native';

describe('Splash', () => {
  it('renders the Splash screen correctly', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <Splash />
      </NavigationContainer>,
    );

    expect(getByTestId('Splash')).toBeTruthy();
  });
});
