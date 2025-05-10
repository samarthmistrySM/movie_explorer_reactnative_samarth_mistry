import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import Login from '../../src/screens/auth/Login';
import AuthContext from '../../src/context/AuthContext';
import {NavigationContainer} from '@react-navigation/native';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const navigation = jest.requireActual('@react-navigation/native');
  return {
    ...navigation,
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

describe('Login', () => {
  const mockLogin = jest.fn();

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  const renderComponent = () =>
    render(
      <AuthContext.Provider value={{handelLogin: mockLogin}}>
        <NavigationContainer>
          <Login />
        </NavigationContainer>
      </AuthContext.Provider>,
    );

  it('renders the login screen correctly', () => {
    const {getByText, getByPlaceholderText} = renderComponent();

    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Sign In')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
  });

  it('changes input for email and password', () => {
    const {getByPlaceholderText} = renderComponent();

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(emailInput, 'samarthmistry311@gmail.com');
    fireEvent.changeText(passwordInput, 'password123');

    expect(emailInput.props.value).toBe('samarthmistry311@gmail.com');
    expect(passwordInput.props.value).toBe('password123');
  });

  it('calls the onLogin function when the button is clicked', () => {
    const {getByPlaceholderText, getByText} = renderComponent();
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const signInButton = getByText('Sign In');

    fireEvent.changeText(emailInput, 'samarthmistry311@gmail.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(signInButton);

    expect(mockLogin).toHaveBeenCalledWith(
      'samarthmistry311@gmail.com',
      'password123',
      'user'
    );
  });

  it('navigates to signup screen when button is clicked', () => {
    const {getByTestId} = renderComponent();
    const signUpButton = getByTestId('signUpBtn');

    fireEvent.press(signUpButton);

    expect(mockNavigate).toHaveBeenCalledWith('SignUp');
  });
});
