import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import MembershipCard from '../../src/components/MembershipCard';
import { NavigationContainer } from '@react-navigation/native';

// Mock data for the tests
const mockData = {
  name: 'Silver',
  price: 200,
  durationInDays: 30,
  content: ['2 devices', 'HD streaming', 'Limited Contents'],
  priceId: 'silver_price_id',
};

describe('MembershipCard', () => {
  it('renders membership name correctly', () => {
    const {getByText} = render(<NavigationContainer><MembershipCard membership={mockData} index={1} /></NavigationContainer>);
    expect(getByText('Silver')).toBeTruthy();
  });

  it('renders all detail containers for the content array', () => {
    const {getAllByTestId} = render(<NavigationContainer><MembershipCard membership={mockData} index={1} /></NavigationContainer>);
    const detailContainers = getAllByTestId('detail-container');
    expect(detailContainers.length).toBe(mockData.content.length);
  });

  it('renders "Choose Plan" button correctly', () => {
    const {getByText} = render(<NavigationContainer><MembershipCard membership={mockData} index={1} /></NavigationContainer>);
    const button = getByText('Choose Plan');
    expect(button).toBeTruthy();
  });
});
