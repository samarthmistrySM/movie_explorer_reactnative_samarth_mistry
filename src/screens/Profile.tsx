import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AuthContext from '../context/AuthContext';
import memberships from '../mock/plans.json';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MainTabsParams } from '../navigation/Types';

interface Membership {
  name: string;
  price: number;
  planType: string;
  content: string[];
}

const Profile = () => {
  const {loggedUser, handleLogout, subscription} = useContext(AuthContext);
  const [activatedPlan, setActivatedPlan] = useState<Membership>(
    memberships[0],
  );

  const navigation =
      useNavigation<NavigationProp<MainTabsParams>>();

  const profilePic =
    'https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg';

  useEffect(() => {
    if (subscription === 'premium') {
      setActivatedPlan(memberships[1]);
    } else if (subscription === 'supervisor') {
      setActivatedPlan(memberships[2]);
    } else if (subscription === 'basic') {
      setActivatedPlan(memberships[0]);
    }
  }, [subscription]);

  
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
                uri: profilePic,
              }}
            />
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>Hello {loggedUser.name}</Text>
          <TouchableOpacity
            style={styles.logOutBtn}
            onPress={() => handleLogout()}>
            <Text style={styles.logOutBtnText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.premiumContainer}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.planTitle}>{activatedPlan.name}</Text>
              <Text style={styles.planValidity}>Valid until Dec 2025</Text>
            </View>
            <TouchableOpacity style={styles.manageBtn} onPress={()=>navigation.navigate("Subscription")}>
              <Text style={styles.manageText}>Manage</Text>
            </TouchableOpacity>
          </View>
          {activatedPlan.content.map((plan, i) => (
            <View key={i} style={styles.bulletRow}>
              <View style={styles.redBullet} />
              <Text style={styles.bulletText}>{plan}</Text>
            </View>
          ))}
        </View>
        <View style={styles.detailsContainer}>
          <View>
            <Text style={styles.detailsTitle}>NAME</Text>
            <Text style={styles.detailsText}>{loggedUser.name}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.detailsContainer}>
          <View>
            <Text style={styles.detailsTitle}>EMAIL</Text>
            <Text style={styles.detailsText}>{loggedUser.email}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.detailsContainer}>
          <View>
            <Text style={styles.detailsTitle}>Phone Number</Text>
            <Text style={styles.detailsText}>{loggedUser.mobile_number}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.detailsContainer}>
          <View>
            <Text style={styles.detailsTitle}>Membership</Text>
            <Text style={styles.detailsText}>
              {subscription?.toUpperCase() || 'free plan'}
            </Text>
          </View>
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
  divider: {
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
    flexGrow: 1,
    justifyContent: 'space-between',
  },
   premiumContainer: {
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  planTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  planValidity: {
    color: '#ff3b30',
    fontSize: 14,
    fontWeight: '600',
  },
  manageBtn: {
    backgroundColor: '#232324',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderColor: '#ff3b30',
    borderWidth: 1,
  },
  manageText: {
    color: '#ff3b30',
    fontWeight: 'bold',
    fontSize: 15,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  redBullet: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#ff3b30',
    marginRight: 10,
  },
  bulletText: {
    color: '#fff',
    fontSize: 15,
  },
});

export default Profile;
