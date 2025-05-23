import React from 'react';
import {render} from '@testing-library/react-native';
import Profile from '../../src/screens/Profile';
import AuthContext from '../../src/context/AuthContext';
import {NavigationContainer} from '@react-navigation/native';

describe('Profile', () => {
  const mockUser = {
    name: 'Samarth',
    email: 'samarthmistry311@gmail.com',
    mobile_number: '1234567890',
  };

  const mockLogout = jest.fn();

  it('renders user name and membership type correctly', () => {
    const {getByText} = render(
      <NavigationContainer>
        <AuthContext.Provider
          value={{
            loggedUser: mockUser,
            handleLogout: mockLogout,
            subscription: 'premium',
          }}>
          <Profile />
        </AuthContext.Provider>
      </NavigationContainer>,
    );

    expect(getByText(`Hello ${mockUser.name}`)).toBeTruthy();
    expect(getByText(mockUser.email)).toBeTruthy();
    expect(getByText(mockUser.mobile_number)).toBeTruthy();
    expect(getByText('PREMIUM')).toBeTruthy();
  });

  it('renders Premium plus card', () => {
    const {getByText} = render(
      <NavigationContainer>
        <AuthContext.Provider
          value={{
            loggedUser: mockUser,
            handleLogout: mockLogout,
            subscription: 'premium',
          }}>
          <Profile />
        </AuthContext.Provider>
      </NavigationContainer>,
    );

    expect(getByText('Premium Plus')).toBeTruthy();
  });

  it('renders Premium Platinum card', () => {
    const {getByText} = render(
      <NavigationContainer>
        <AuthContext.Provider
          value={{
            loggedUser: mockUser,
            handleLogout: mockLogout,
            subscription: 'supervisor',
          }}>
          <Profile />
        </AuthContext.Provider>
      </NavigationContainer>,
    );

    expect(getByText('Premium Platinum')).toBeTruthy();
  });

  it('renders Basic plan card', () => {
    const {getByText} = render(
      <NavigationContainer>
        <AuthContext.Provider
          value={{
            loggedUser: mockUser,
            handleLogout: mockLogout,
            subscription: 'basic',
          }}>
          <Profile />
        </AuthContext.Provider>
      </NavigationContainer>,
    );

    expect(getByText('Basic')).toBeTruthy();
  });
});
