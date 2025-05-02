import React, {FC, useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useStripe} from '@stripe/stripe-react-native';
import axios from 'axios';

const {width} = Dimensions.get('window');
interface Props {
  membership: {
    name: string;
    price: number;
    durationInDays: number;
    content: string[];
  };
  index: number;
}

const MembershipCard: FC<Props> = ({membership, index}) => {
  // const {initPaymentSheet, presentPaymentSheet} = useStripe();
  // const [clientSecret, setClientSecret] = useState(null);

  // const fetchPaymentIntent = async () => {
  //   try {
  //     const response = await axios.post(
  //       'http://localhost:3000/create-payment-intent',
  //       {
  //         amount: 1099 * 100,
  //         currency: 'inr',
  //       },
  //     );

  //     const {clientSecret : cs} = response.data;
  //     setClientSecret(cs);
  //   } catch (error: any) {
  //     console.log('Error fetching payment intent:', error.message);
  //   }
  // };

  // const initializePaymentSheet = async () => {
  //   if (!clientSecret) return;

  //   const {error} = await initPaymentSheet({
  //     merchantDisplayName: 'Movie Explorer+',
  //     paymentIntentClientSecret: clientSecret,
  //     returnURL: 'https://google.com/',
  //   });

  //   if (error) {
  //     console.log('Error initializing payment sheet:', error.message);
  //   }
  // };

  // useEffect(() => {
  //   (async () => {
  //     await fetchPaymentIntent();
  //   })();
  // }, []);

  // useEffect(() => {
  //   if (clientSecret) {
  //     initializePaymentSheet();
  //   }
  // }, [clientSecret]);

  // const checkout = async () => {
  //   const {error} = await presentPaymentSheet();

  //   if (error) {
  //     Alert.alert('Payment failed', error.message);
  //   } else {
  //     Alert.alert('Success', 'Your payment is confirmed!');
  //   }
  // };

  return index % 2 === 0 ? (
    <View style={[styles.membershipContainer, styles.darkThemeCard]}>
      <View style={styles.contentWrapper}>
        <Text style={styles.membershipName}>{membership.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.membershipPrice}>₹{membership.price}</Text>
          <Text style={styles.membershipTime}>/month</Text>
        </View>
        <View style={styles.membershipDetails}>
          {membership.content.map((detail: string, i: number) => (
            <View key={i} style={styles.detailContainer} testID="detail-container">
              <Image
                source={require('../assets/checkmark.png')}
                style={[styles.icon, styles.darkThemeIcon]}
              />
              <Text style={styles.detailText}>{detail}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity
          style={[styles.purchaseButton, styles.darkThemeButton]}
          >
          <Text style={[styles.purchaseButtonText, styles.darkThemeButtonText]}>
            Choose Plan
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <View style={[styles.membershipContainer, styles.redWhiteThemeCard]}>
      <LinearGradient
        colors={['#0000', '#1C1C1E8E']}
        style={styles.linearGradient}
      />
      <View style={styles.contentWrapper}>
        <Text style={styles.membershipName}>{membership.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.membershipPrice}>₹{membership.price}</Text>
          <Text style={styles.membershipTime}>/month</Text>
        </View>
        <View style={styles.membershipDetails}>
          {membership.content.map((detail: string, i: number) => (
            <View key={i} style={styles.detailContainer} testID="detail-container">
              <Image
                source={require('../assets/checkmark.png')}
                style={[styles.icon, styles.redWhiteIcon]}
              />
              <Text style={styles.detailText}>{detail}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity
          style={[styles.purchaseButton, styles.redWhiteButton]}>
          <Text style={[styles.purchaseButtonText, styles.redWhiteButtonText]}>
            Choose Plan
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  membershipContainer: {
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 15,
    padding: 20,
  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  darkThemeCard: {
    backgroundColor: '#1C1C1E',
  },
  darkThemeButton: {
    backgroundColor: '#FF3B30',
  },
  darkThemeButtonText: {
    color: '#FFF',
  },
  darkThemeIcon: {
    tintColor: '#FF3B30',
  },
  redWhiteThemeCard: {
    backgroundColor: '#FF3B30',
  },
  redWhiteButton: {
    backgroundColor: '#FFF',
  },
  redWhiteButtonText: {
    color: '#FF3B30',
  },
  redWhiteIcon: {
    tintColor: '#1C1C1E',
  },
  membershipName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFF',
  },
  membershipPrice: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFF',
  },
  membershipTime: {
    fontSize: 14,
    color: '#FFF',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  membershipDetails: {
    marginBottom: 10,
  },
  detailContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  icon: {
    height: width * 0.04,
    width: width * 0.04,
    resizeMode: 'contain',
    marginRight: 10,
  },
  detailText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  purchaseButton: {
    borderRadius: 8,
    paddingVertical: 15,
  },
  purchaseButtonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  contentWrapper: {
    flex: 1,
    zIndex: 1,
  },
});

export default MembershipCard;
