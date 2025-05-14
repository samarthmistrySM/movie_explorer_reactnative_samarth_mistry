import React from 'react';
import {render} from '@testing-library/react-native';
import Profile from '../../src/screens/Profile';
import AuthContext from '../../src/context/AuthContext';

describe('Profile', () => {
  const mockUser = {
    name: 'Samarth',
    email: 'samarthmistry311@gmail.com',
    mobile_number: '1234567890',
  };

  const mockLogout = jest.fn();

  it('renders user name and membership type correctly', () => {
    console.log('profile ',Profile);
    
    const {getByText} = render(
      <AuthContext.Provider
        value={{
          loggedUser: mockUser,
          handleLogout: mockLogout,
          subscription: 'premium',
        }}>
        <Profile />
      </AuthContext.Provider>,
    );

    expect(getByText(`Hello ${mockUser.name}`)).toBeTruthy();
    expect(getByText(mockUser.email)).toBeTruthy();
    expect(getByText(mockUser.mobile_number)).toBeTruthy();
    expect(getByText('PREMIUM')).toBeTruthy();
  });
});
