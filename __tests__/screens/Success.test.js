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
    (useNavigation).mockReturnValue({navigate: mockNavigate});
    jest.clearAllMocks();
  });

  it('renders success message and image, and triggers navigation and update on button press', () => {
    const {getByText, getByRole} = render(
      <AuthContext.Provider value={{update: mockUpdate}}>
        <Success />
      </AuthContext.Provider>
    );

    // Check text presence
    expect(getByText('Subscription Successful!')).toBeTruthy();
    expect(getByText('Thank you for subscribing to MoviePlus')).toBeTruthy();

    // Tap the "Continue" button
    fireEvent.press(getByText('Continue'));

    // Expect navigation and update to be called
    expect(mockUpdate).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('Main');
  });
});
