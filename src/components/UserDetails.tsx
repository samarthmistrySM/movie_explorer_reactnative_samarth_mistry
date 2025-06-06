import React, {useContext} from 'react';
import {Text, StyleSheet, View, Image, Dimensions, TouchableOpacity} from 'react-native';
import AuthContext from '../context/AuthContext.tsx';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParams } from '../navigation/Types.ts';

const {width} = Dimensions.get('window');
const UserDetails = () => {
  const {loggedUser,subscription} = useContext(AuthContext);
  const navigation =
      useNavigation<NativeStackNavigationProp<MainStackParams>>();
  return (
    <View style={styles.userDetailsContainer}>
      <View style={styles.userDetailsLeft}>
        <Image
          style={styles.userProfile}
          testID="user-profile-image"
          accessibilityRole="image"
          source={{uri: 'https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg'}}
        />
        <View>
          <Text style={styles.username}>
            Hello, {loggedUser.name}
          </Text>
          <Text testID={'membershipType'} style={styles.membershipType}>
            {subscription?.toUpperCase() || 'free plan'}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate('WatchList')}>
        <Image
        testID="bell-icon"
        accessibilityRole="image"
        source={require('../assets/bookmark.fill.png')}
        style={styles.icon}
      />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  userDetailsContainer: {
    marginTop: 25,
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
    height: width * 0.1,
    width: width * 0.1,
    borderRadius: width * 0.05,
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
    height: width * 0.05,
    width: width * 0.05,
    tintColor: '#ddd',
    resizeMode: 'contain',
  },
});

export default UserDetails;
