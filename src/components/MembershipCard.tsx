import React, {FC, useContext, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getStripeSessionUrl} from '../api/paymentApi';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParams} from '../navigation/Types';
import AuthContext from '../context/AuthContext';

const {width} = Dimensions.get('window');
interface Props {
  membership: {
    name: string;
    price: number;
    planType: string;
    content: string[];
  };
  index: number;
}

const MembershipCard: FC<Props> = ({membership, index}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {subscription} = useContext(AuthContext);

   const navigation =
        useNavigation<NativeStackNavigationProp<MainStackParams>>();

  const checkout = async () => {
    try {
      setIsLoading(true);
      const res = await getStripeSessionUrl(membership.planType);

      if(res.data.session_id && res.data.url){
        navigation.navigate('Payment', {session_id: res.data.session_id, url: res.data.url})
      }

    } catch (error: any) {
      console.log("error purchasing membership",error);
    } finally {
      setIsLoading(false);
    }
  };

  return index % 2 === 0 ? (
    <View style={[styles.membershipContainer, styles.darkThemeCard]}>
      <View style={styles.contentWrapper}>
        <Text style={styles.membershipName}>{membership.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.membershipPrice}>£{membership.price}</Text>
          <Text style={styles.membershipTime}>/{membership.planType}</Text>
        </View>
        <View style={styles.membershipDetails}>
          {membership.content.map((detail: string, i: number) => (
            <View
              key={i}
              style={styles.detailContainer}
              testID="detail-container">
              <Image
                source={require('../assets/checkmark.png')}
                style={[styles.icon, styles.darkThemeIcon]}
              />
              <Text style={styles.detailText}>{detail}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity
          disabled={isLoading || subscription === 'premium' || subscription === 'supervisor' }
          onPress={checkout}
          testID='btn'
          style={[styles.purchaseButton, styles.darkThemeButton]}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text
              style={[styles.purchaseButtonText, styles.darkThemeButtonText]}>
               {subscription === 'premium' ? 'Subscribed' : subscription === 'supervisor' ? 'Supervisor Account' : 'Choose plan'} 
            </Text>
          )}
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
          <Text style={styles.membershipPrice}>£{membership.price}</Text>
          <Text style={styles.membershipTime}>/{membership.planType}</Text>
        </View>
        <View style={styles.membershipDetails}>
          {membership.content.map((detail: string, i: number) => (
            <View
              key={i}
              style={styles.detailContainer}
              testID="detail-container">
              <Image
                source={require('../assets/checkmark.png')}
                style={[styles.icon, styles.redWhiteIcon]}
              />
              <Text style={styles.detailText}>{detail}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity
        testID='btn'
        disabled={isLoading || subscription === 'premium' || subscription === 'supervisor' }
          onPress={checkout}
          style={[styles.purchaseButton, styles.redWhiteButton]}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#FF3B30" />
          ) : (
            <Text
              style={[styles.purchaseButtonText, styles.redWhiteButtonText]}>
              {subscription === 'premium' ? 'Subscribed' : subscription === 'supervisor' ? 'Supervisor Account' : 'Choose plan'} 
            </Text>
          )}
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
    fontSize: 18,
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
