import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Success from '../../src/screens/Success';
import {useNavigation} from '@react-navigation/native';
import AuthContext from '../../src/context/AuthContext';

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: jest.fn(),
  };
});

describe('Success Screen', () => {
  const mockNavigate = jest.fn();
  const mockUpdate = jest.fn();

  beforeEach(() => {
    (useNavigation).mockReturnValue({replace: mockNavigate});
    jest.clearAllMocks();
  });

  it('renders success message and image, and triggers navigation and update on button press', () => {
    const {getByText, getByRole} = render(
      <AuthContext.Provider value={{update: mockUpdate}}>
        <Success />
      </AuthContext.Provider>
    );

    expect(getByText('Subscription Successful!')).toBeTruthy();
    expect(getByText('Thank you for subscribing to MoviePlus. Enjoy unlimited movies and exclusive content!')).toBeTruthy();

    fireEvent.press(getByText('Continue'));

    expect(mockUpdate).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('Main');
  });
});
