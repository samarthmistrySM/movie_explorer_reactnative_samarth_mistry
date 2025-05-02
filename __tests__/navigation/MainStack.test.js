import React from 'react';
import MainStack from '../../src/navigation/MainStack';
import {render, waitFor} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';

describe('Main stack', () => {
  it('renders correctly', async () => {
    const mainStack = render(
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>,
    );

    expect(mainStack).toBeTruthy();
  });
});
