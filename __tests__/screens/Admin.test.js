import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import Admin from '../../src/screens/admin/Admin';
import {NavigationContainer} from '@react-navigation/native';

describe('Admin', () => {
  it('renders the Admin screen correctly', () => {
    const {getByText} = render(
      <NavigationContainer>
        <Admin />
      </NavigationContainer>,
    );

    expect(getByText('Supervisor Control')).toBeTruthy();
  });
});
