import React from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import MembershipCard from '../components/MembershipCard.tsx';
const {height, width} = Dimensions.get('window');
import memberships from "../mock/plans.json"

const Subscription = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.membershipWrapper}>
        <Image
          style={styles.bgImage}
          source={require('../assets/premium-bg.png')}
        />
        <Text style={[styles.heading, styles.text]}>Premium</Text>
        <Text style={[styles.quote, styles.text]}>
          Get more out of your movies with Premium Gold.
        </Text>
        <Text style={[styles.heading2, styles.text]}>Available plans</Text>
        {memberships.map((membership, index) => (
          <MembershipCard key={index} membership={membership} index={index} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  membershipWrapper: {
    marginBottom: 20,
  },
  bgImage: {
    width: '100%',
    height: height * 0.3,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  text: {
    color: '#FFF',
    fontWeight: 'bold',
    paddingHorizontal: 15,
  },
  quote: {
    fontSize: width * 0.07,
    marginBottom: 15,
  },
  heading: {
    fontSize: width * 0.04,
    marginBottom: 5,
  },
  heading2: {
    fontSize: width * 0.055,
    marginBottom: 20,
  },
});

export default Subscription;
