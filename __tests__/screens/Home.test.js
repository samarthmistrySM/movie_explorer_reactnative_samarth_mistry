import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import Home from '../../src/screens/Home';
import {NavigationContainer} from '@react-navigation/native';

describe('Home', () => {
  it('renders the home screen correctly', () => {
    const {getByText} = render(
      <NavigationContainer>
        <Home />
      </NavigationContainer>,
    );

    expect(getByText('Netflix')).toBeTruthy();
    expect(getByText('Amazon ')).toBeTruthy();
    expect(getByText('HBO')).toBeTruthy();
    expect(getByText('Continue Watching')).toBeTruthy();
  });

  it('filters movies based on the selected label', () => {
    const {getByText, getByTestId} = render(
      <NavigationContainer>
        <Home />
      </NavigationContainer>,
    );

    const label1 = getByTestId('label-0');
    const label2 = getByTestId('label-1');

    const newReleasesLabel = getByText('Amazon');


    expect(label1.props.style).toEqual({"backgroundColor": "#FF3B30", "borderRadius": 20, "opacity": 1, "padding": 8});
    fireEvent.press(newReleasesLabel);
    expect(label2.props.style).toEqual({"backgroundColor": "#FF3B30", "borderRadius": 20, "opacity": 1, "padding": 8});
  });
});
