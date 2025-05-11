import React, {FC, useContext, useEffect, useState} from 'react';
import MainNavigator from './MainStack';
import AuthNavigator from './AuthNavigator';
import AdminNavigator from './AdminNavigator';
import {NavigationContainer} from '@react-navigation/native';
import AuthContext from '../context/AuthContext';
import Splash from '../screens/Splash';
import {updateDeviceToken} from '../api/notificationApi';
import Toast from "react-native-simple-toast"

interface Props {
  fcmToken: string;
}

const Navigator: FC<Props> = ({fcmToken}) => {
  const {isLoggedIn, userRole, loggedUser} = useContext(AuthContext);
  const [isSplash, setIsSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const updateToken = async () => {
        try {
          await updateDeviceToken(fcmToken);
          Toast.show('Device token updated!',Toast.LONG)
        } catch (error: any) {
          console.log('Error updating device token', error.message);
        }
      };
      updateToken();
    }
  }, [fcmToken, isLoggedIn]);

  if (isSplash) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        userRole === 'supervisor' && loggedUser.role === 'supervisor' ? (
          <AdminNavigator />
        ) : (
          <MainNavigator />
        )
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default Navigator;
