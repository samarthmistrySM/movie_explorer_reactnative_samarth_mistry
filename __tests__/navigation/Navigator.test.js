import React from 'react';
import Navigator from '../../src/navigation/Navigator';
import {render, waitFor} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import AuthContext from '../../src/context/AuthContext';

describe('Navigator', () => {
  it('renders correctly', async () => {
    const mockUser = {name: 'Samarth'};

    const authStack = render(
        <AuthContext.Provider value={{loggedUser: mockUser}}>
        <Navigator />
        </AuthContext.Provider>
    );

    expect(authStack).toBeTruthy();
  });
});
