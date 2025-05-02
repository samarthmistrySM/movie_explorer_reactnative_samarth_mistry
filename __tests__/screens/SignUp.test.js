import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import SignUp from '../../src/screens/auth/SignUp';
import AuthContext from '../../src/context/AuthContext';
import {NavigationContainer} from '@react-navigation/native';

const mockGoBack = jest.fn();
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const navigation = jest.requireActual('@react-navigation/native');
  return {
    ...navigation,
    useNavigation: () => ({
      goBack: mockGoBack,
      navigate: mockNavigate,
    }),
  };
});

describe('SignUp', () => {
  const mockRegister = jest.fn();

  const renderComponent = () =>
    render(
      <AuthContext.Provider value={{handelRegister: mockRegister}}>
        <NavigationContainer>
          <SignUp />
        </NavigationContainer>
      </AuthContext.Provider>,
    );

  it('renders the singup screen correctly', () => {
    const {getByText, getByPlaceholderText} = renderComponent();

    expect(getByPlaceholderText('Name')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Phone Number')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
    expect(getByText('Sign In')).toBeTruthy();
  });

  it('changes input for name, email, phone number and password', () => {
    const {getByPlaceholderText} = renderComponent();
    const nameInput = getByPlaceholderText('Name');
    const emailInput = getByPlaceholderText('Email');
    const phoneInput = getByPlaceholderText('Phone Number');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(nameInput, 'Samarth');
    fireEvent.changeText(emailInput, 'samarthmistry311@gmail.com');
    fireEvent.changeText(phoneInput, '1234567890');
    fireEvent.changeText(passwordInput, 'password123');

    expect(nameInput.props.value).toBe('Samarth');
    expect(emailInput.props.value).toBe('samarthmistry311@gmail.com');
    expect(phoneInput.props.value).toBe('1234567890');
    expect(passwordInput.props.value).toBe('password123');
  });

  it('calls the onRegister function when the button is clicked', () => {
    const {getByPlaceholderText, getByText} = renderComponent();
    const nameInput = getByPlaceholderText('Name');
    const emailInput = getByPlaceholderText('Email');
    const phoneInput = getByPlaceholderText('Phone Number');
    const passwordInput = getByPlaceholderText('Password');
    const signUnButton = getByText('Sign Up');

    fireEvent.changeText(nameInput, 'Samarth');
    fireEvent.changeText(emailInput, 'samarthmistry311@gmail.com');
    fireEvent.changeText(phoneInput, '1234567890');
    fireEvent.changeText(passwordInput, 'password123');

    fireEvent.press(signUnButton);

    expect(mockRegister).toHaveBeenCalledWith(
      'Samarth',
      'samarthmistry311@gmail.com',
      '1234567890',
      'password123',
    );
  });

  it('navigates to Login Screen when register successfully', async () => {
    mockRegister.mockReturnValueOnce(true);

    const {getByPlaceholderText, getByText} = renderComponent();
    const nameInput = getByPlaceholderText('Name');
    const emailInput = getByPlaceholderText('Email');
    const phoneInput = getByPlaceholderText('Phone Number');
    const passwordInput = getByPlaceholderText('Password');
    const signUpButton = getByText('Sign Up');

    fireEvent.changeText(nameInput, 'Samarth');
    fireEvent.changeText(emailInput, 'samarthmistry311@gmail.com');
    fireEvent.changeText(phoneInput, '1234567890');
    fireEvent.changeText(passwordInput, 'password123');

    fireEvent.press(signUpButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Login');
    });
  });
  
  it('navigates to signup screen when button is clicked', () => {
    const {getByTestId} = renderComponent();
    const goBackBtn = getByTestId('goBackBtn');

    fireEvent.press(goBackBtn);

    expect(mockGoBack).toHaveBeenCalledWith();
  });
});
