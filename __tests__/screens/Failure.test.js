import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Failure from '../../src/screens/Failure';
import {useNavigation} from '@react-navigation/native';
import AuthContext from '../../src/context/AuthContext';

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: jest.fn(),
  };
});

describe('Failure Screen', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigation).mockReturnValue({replace: mockNavigate});
    jest.clearAllMocks();
  });

  it('renders success message and image, and triggers navigation and update on button press', () => {
    const {getByText} = render(
        <Failure />
    );

    expect(getByText('Subscription Canceled')).toBeTruthy();
    expect(getByText('Your subscription could not be completed. Please try again or contact support if the issue persists.')).toBeTruthy();

    fireEvent.press(getByText('Try Again'));

    expect(mockNavigate).toHaveBeenCalledWith('Main',{
        screen: 'Subscription'
    });
  });
});
