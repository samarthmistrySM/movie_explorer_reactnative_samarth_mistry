import React from 'react';
import {render} from '@testing-library/react-native';
import MembershipCard from '../../src/components/MembershipCard';

const mockData = {
  name: 'Silver',
  price: 200,
  durationInDays: 30,
  content: ['2 devices', 'HD streaming', 'Limited Contents'],
};

describe('MembershipCard', () => {
    it('renders correctly', () => {
      const {getByText} = render(<MembershipCard membership={mockData} index={1}/>);
      expect(getByText('Silver')).toBeTruthy();
    });

    it('renders all detail containers for the content array', () => {
      const { getAllByTestId } = render(<MembershipCard membership={mockData} index={1} />);
      const detailContainers = getAllByTestId('detail-container');
      expect(detailContainers.length).toBe(mockData.content.length);
    });
  });