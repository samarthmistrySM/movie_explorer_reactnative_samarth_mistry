import React from 'react';
import {render} from '@testing-library/react-native';
import UserDetails from '../../src/components/UserDetails';
import AuthContext from '../../src/context/AuthContext';

describe('UserDetails', () => {
  const mockUser = {name: 'Samarth'};

  it('renders user name and membership type correctly', () => {
    const {getByText, getByTestId} = render(
      <AuthContext.Provider value={{loggedUser: mockUser}}>
        <UserDetails />
      </AuthContext.Provider>,
    );

    expect(getByText('Hello, Samarth')).toBeTruthy();
    expect(getByTestId('membershipType')).toBeTruthy();
  });

  it('renders images', () => {
    const {getByTestId} = render(
      <AuthContext.Provider value={{loggedUser: mockUser}}>
        <UserDetails />
      </AuthContext.Provider>,
    );
    expect(getByTestId('bell-icon')).toBeTruthy();
    expect(getByTestId('user-profile-image')).toBeTruthy();
  });
});
