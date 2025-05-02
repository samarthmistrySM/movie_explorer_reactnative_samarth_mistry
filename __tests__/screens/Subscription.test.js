import React from 'react';
import {render} from '@testing-library/react-native';
import Subscription from '../../src/screens/Subscription';

describe('Subscription Screen', () => {
    it('renders the subscription screen correctly', () => {
        const {getByText} = render(<Subscription />);

        expect(getByText('Premium')).toBeTruthy();
        expect(
            getByText('Get more out of your movies with Premium Gold.'),
        ).toBeTruthy();
        expect(getByText('Available plans')).toBeTruthy();
    });
});
