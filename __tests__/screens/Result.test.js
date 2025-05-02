import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import Result from '../../src/screens/Result';
import {NavigationContainer} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';

const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => {
  const navigation = jest.requireActual('@react-navigation/native');
  return {
    ...navigation,
    useRoute: jest.fn(),
    useNavigation: () => ({
      goBack: mockGoBack,
    }),
  };
});

describe('Result', () => {
  beforeEach(() => {
    useRoute.mockReturnValue({
      params: {filter: 'Action'},
    });
  });

  it('renders the Result screen correctly', () => {
    const {getByText} = render(
      <NavigationContainer>
        <Result />
      </NavigationContainer>,
    );

    expect(getByText('Search results for Action')).toBeTruthy();
  });

  it('navigates to search screen when go back button is clicked', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <Result />
      </NavigationContainer>,
    );
    const goBackBtn = getByTestId('goBackBtn');

    fireEvent.press(goBackBtn);

    expect(mockGoBack).toHaveBeenCalledWith();
  });
});
