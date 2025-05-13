import React, {useEffect} from 'react';
import {render, waitFor} from '@testing-library/react-native';
import Payment from '../../src/screens/Payment';
import {WebView} from 'react-native-webview';
import * as paymentApi from '../../src/api/paymentApi';
import {useNavigation, useRoute,NavigationContainer} from '@react-navigation/native';

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: jest.fn(),
    useRoute: jest.fn(),
  };
});


jest.mock('react-native-webview', () => {
  const React = require('react');
  const {View} = require('react-native');

  return {
    WebView: ({onNavigationStateChange}) => {
      React.useEffect(() => {
        onNavigationStateChange({url: 'https://example.com/success'});
      }, []);
      return <View testID="webview" />;
    },
  };
});


jest.mock('../../src/api/paymentApi', () => ({
  handleSuccessfulPayment: jest.fn(),
}));

describe('Payment Screen', () => {
  const mockReplace = jest.fn();

  beforeEach(() => {
    (useNavigation).mockReturnValue({replace: mockReplace});
    (useRoute).mockReturnValue({
      params: {url: 'https://example.com/payment', session_id: '1234'},
    });

    jest.clearAllMocks();
  });

  it('renders WebView and navigates to Success screen on successful payment', async () => {
    (paymentApi.handleSuccessfulPayment).mockResolvedValue({
      status: 200,
    });

    render(<NavigationContainer><Payment /></NavigationContainer>);

    await waitFor(() => {
      expect(paymentApi.handleSuccessfulPayment).toHaveBeenCalledWith('1234');
      expect(mockReplace).toHaveBeenCalledWith('Success');
    });
  });
});
