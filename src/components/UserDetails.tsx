import React, {useContext} from 'react';
import {Text, StyleSheet, View, Image, Dimensions} from 'react-native';
import AuthContext from '../context/AuthContext.tsx';

const {width, height} = Dimensions.get('window');
const UserDetails = () => {
  const {loggedUser} = useContext(AuthContext);
  return (
    <View style={styles.userDetailsContainer}>
      <View style={styles.userDetailsLeft}>
        <Image
          style={styles.userProfile}
          source={{
            uri: 'https://lh3.googleusercontent.com/a/ACg8ocKQblDIwzPa7ztlKWSLGTNu-rxU2bV5gv_nnDAxN8rcuvnN_g=s576-c-no',
          }}
        />
        <View>
          <Text style={styles.username}>Hello, {loggedUser.name}</Text>
          <Text style={styles.membershipType}>Premium Member</Text>
        </View>
      </View>
      <Image source={require('../assets/bell.fill.png')} style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  userDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.04,
    marginBottom: 10,
  },
  userDetailsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userProfile: {
    height: height * 0.05,
    width: height * 0.05,
    borderRadius: height * 0.08,
    marginRight: 8,
  },
  username: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  membershipType: {
    color: '#FFF',
  },
  icon: {
    height: height * 0.02,
    width: height * 0.02,
    tintColor: '#ddd',
  },
});

export default UserDetails;
