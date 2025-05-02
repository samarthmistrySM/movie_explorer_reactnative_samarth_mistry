import React from 'react';
import AuthNavigator from '../../src/navigation/AuthNavigator';
import {render, waitFor} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';

describe('Auth stack', () => {
  it('renders correctly', async () => {
    const authStack = render(
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>,
    );

    expect(authStack).toBeTruthy();
  });
});
