import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import MembershipCard from '../../src/components/MembershipCard';
import {NavigationContainer} from '@react-navigation/native';
import AuthContext from '../../src/context/AuthContext';

const mockData = {
  name: 'Silver',
  price: 200,
  planType: '1_day',
  content: ['2 devices', 'HD streaming', 'Limited Contents'],
};

const mockGetStripeSessionUrl = jest.fn();
jest.mock('../../src/api/paymentApi', () => ({
  getStripeSessionUrl: (...args) => mockGetStripeSessionUrl(...args),
}));

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

describe('MembershipCard', () => {

  const renderComponent = (membership = mockData, subscription = '') =>
    render(
      <AuthContext.Provider value={{ subscription }}>
        <NavigationContainer>
          <MembershipCard membership={membership} index={0} />
        </NavigationContainer>
      </AuthContext.Provider>
    );

  it('renders membership name correctly', () => {
    const {getByText} = renderComponent();
    expect(getByText('Silver')).toBeTruthy();
  });

  it('renders all detail containers for the content array', () => {
    const {getAllByTestId} = renderComponent();
    const detailContainers = getAllByTestId('detail-container');
    expect(detailContainers.length).toBe(mockData.content.length);
  });

  it('renders "Choose Plan" button correctly', () => {
    const {getByTestId} = renderComponent();
    const button = getByTestId('btn');
    expect(button).toBeTruthy();
  });

  it('calls getStripeSessionUrl and navigates on successful checkout', async () => {
    mockGetStripeSessionUrl.mockResolvedValueOnce({
      data: { session_id: 'abc', url: 'https://pay.com/session' },
    });

    const { getByTestId } = renderComponent();
    fireEvent.press(getByTestId('btn'));

    await waitFor(() => {
      expect(mockGetStripeSessionUrl).toHaveBeenCalledWith('1_day');
      expect(mockNavigate).toHaveBeenCalledWith('Payment', {
        session_id: 'abc',
        url: 'https://pay.com/session',
      });
    });
  });
});
