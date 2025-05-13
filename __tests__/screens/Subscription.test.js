import React from 'react';
import {render} from '@testing-library/react-native';
import Subscription from '../../src/screens/Subscription';
import { NavigationContainer } from '@react-navigation/native';

describe('Subscription Screen', () => {
    it('renders the subscription screen correctly', () => {
        const {getByText} = render(<NavigationContainer><Subscription /></NavigationContainer>);

        expect(getByText('Premium')).toBeTruthy();
        expect(
            getByText('Get more out of your movies with Premium Gold.'),
        ).toBeTruthy();
        expect(getByText('Available plans')).toBeTruthy();
    });
});
