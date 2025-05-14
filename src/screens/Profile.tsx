import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import AuthContext from '../context/AuthContext';
import { ScrollView } from 'react-native-gesture-handler';

const Profile = () => {
  const {loggedUser, handleLogout,subscription} = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
        <Text style={styles.heading}>Profile</Text>
      </View>
      <View style={styles.dpContainer}>
        <View style={styles.dpBorder}>
          <Image
            style={styles.profileImage}
            source={{
              uri: 'https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg',
            }}
          />
          {/* <View style={styles.editIcon}> */}
            {/* <Image
              style={styles.editIconImage}
              source={require('../assets/pencil.png')}
            /> */}
          {/* </View> */}
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>
          Hello {loggedUser.name}
        </Text>
        <TouchableOpacity
          style={styles.logOutBtn}
          onPress={() => handleLogout()}>
          <Text style={styles.logOutBtnText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.detailsContainer}>
        <View>
          <Text style={styles.detailsTitle}>NAME</Text>
          <Text style={styles.detailsText}>{loggedUser.name}</Text>
        </View>
        {/* <Image
          style={styles.icon}
          source={require('../assets/chevron.right.png')}
        /> */}
      </View>
      <View style={styles.divider}/>
      <View style={styles.detailsContainer}>
        <View>
          <Text style={styles.detailsTitle}>EMAIL</Text>
          <Text style={styles.detailsText}>{loggedUser.email}</Text>
        </View>
        {/* <Image
          style={styles.icon}
          source={require('../assets/chevron.right.png')}
        /> */}
      </View>
      <View style={styles.divider}/>
      <View style={styles.detailsContainer}>
        <View>
          <Text style={styles.detailsTitle}>Phone Number</Text>
          <Text style={styles.detailsText}>
            {loggedUser.mobile_number}
          </Text>
        </View>
        {/* <Image
          style={styles.icon}
          source={require('../assets/chevron.right.png')}
        /> */}
      </View>
      <View style={styles.divider}/>
      <View style={styles.detailsContainer}>
        <View>
          <Text style={styles.detailsTitle}>Membership</Text>
          <Text style={styles.detailsText}>{subscription?.toUpperCase() || 'free plan'}</Text>
        </View>
        {/* <Image
          style={styles.icon}
          source={require('../assets/chevron.right.png')}
        /> */}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  textContainer: {
    marginVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
  },
  logOutBtn: {
    backgroundColor: 'rgba(255, 0, 0, 0.4)',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 10,
  },
  logOutBtnText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  dpContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  dpBorder: {
    borderColor: '#FF3B30',
    borderRadius: 100,
    borderWidth: 2,
    padding: 4,
    position: 'relative',
  },
  editIcon: {
    position: 'absolute',
    backgroundColor: '#FF3B30',
    padding: 5,
    borderRadius: 30,
    bottom: 0,
    right: 0,
  },
  editIconImage: {
    tintColor: '#ffffff',
    width: 20,
    height: 20,
    resizeMode: 'contain',
    borderRadius: 30,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 5,
    alignItems: 'center',
    // backgroundColor: '#1C1C1E',
  },
  divider:{
    width: '100%',
    height: 1,
    backgroundColor: '#ddd',
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
  scrollContent: {
  paddingBottom: 30,
},

});

export default Profile;
