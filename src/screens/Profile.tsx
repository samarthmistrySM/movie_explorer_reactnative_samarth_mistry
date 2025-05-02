import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import AuthContext from '../context/AuthContext';

const Profile = () => {
  const {loggedUser} = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dpContainer}>
        <View style={styles.dpBorder}>
          <Image
            style={styles.profileImage}
            source={{
              uri: 'https://lh3.googleusercontent.com/a/ACg8ocKQblDIwzPa7ztlKWSLGTNu-rxU2bV5gv_nnDAxN8rcuvnN_g=s576-c-no',
            }}
          />
          <View style={styles.editIcon}>
            <Image
              style={styles.editIconImage}
              source={require('../assets/pencil.png')}
            />
          </View>
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>
          Hello {loggedUser.name}
        </Text>
      </View>
      <View style={styles.detailsContainer}>
        <View>
          <Text style={styles.detailsTitle}>NAME</Text>
          <Text style={styles.detailsText}>{loggedUser.name}</Text>
        </View>
        <Image
          style={styles.icon}
          source={require('../assets/chevron.right.png')}
        />
      </View>
      <View style={styles.detailsContainer}>
        <View>
          <Text style={styles.detailsTitle}>EMAIL</Text>
          <Text style={styles.detailsText}>{loggedUser.email}</Text>
        </View>
        <Image
          style={styles.icon}
          source={require('../assets/chevron.right.png')}
        />
      </View>
      <View style={styles.detailsContainer}>
        <View>
          <Text style={styles.detailsTitle}>Phone Number</Text>
          <Text style={styles.detailsText}>{loggedUser.phoneNumber}</Text>
        </View>
        <Image
          style={styles.icon}
          source={require('../assets/chevron.right.png')}
        />
      </View>
      <View style={styles.detailsContainer}>
        <View>
          <Text style={styles.detailsTitle}>Membership</Text>
          <Text style={styles.detailsText}>Platinum</Text>
        </View>
        <Image
          style={styles.icon}
          source={require('../assets/chevron.right.png')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  textContainer: {
    marginVertical: 16,
  },
  welcomeText: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
  },
  dpContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  dpBorder: {
    borderColor: '#4b7bff',
    borderRadius: 50,
    borderWidth: 1,
    padding: 4,
    position: 'relative',
  },
  editIcon: {
    position: 'absolute',
    backgroundColor: '#4b7bff',
    padding: 5,
    borderRadius: 30,
    bottom: 0,
    right: 0,
  },
  editIconImage: {
    tintColor: '#ffffff',
    width: 20,
    height: 20,
    objectFit: 'scale-down',
    borderRadius: 30,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 5,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#dcdcdc',
  },
  detailsTitle: {
    fontSize: 18,
    fontFamily: 'Poppins',
    color: '#FFF',
    fontWeight: '600',
    marginBottom: 5,
  },
  detailsText: {
    fontSize: 17,
    fontFamily: 'Poppins',
    color: '#8e8e8e',
    fontWeight: '400',
  },
  icon: {
    width: 20,
    height: 20,
    objectFit: 'contain',
    tintColor: '#FF3B30',
  },
});

export default Profile;
