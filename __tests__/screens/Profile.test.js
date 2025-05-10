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

  it('renders user name and membership type correctly', () => {
    const {getByText, getByTestId} = render(
      <AuthContext.Provider value={{loggedUser: mockUser}}>
        <Profile />
      </AuthContext.Provider>,
    );

    expect(getByText(`Hello ${mockUser.name}`)).toBeTruthy();
    expect(getByText(mockUser.email)).toBeTruthy();
    expect(getByText(mockUser.mobile_number)).toBeTruthy();
  });

});
