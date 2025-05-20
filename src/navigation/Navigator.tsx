import React, { FC, useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthContext from '../context/AuthContext';
import Splash from '../screens/Splash';
import MainNavigator from './MainStack';
import AuthNavigator from './AuthNavigator';
import AdminNavigator from './AdminNavigator';
import { updateDeviceToken } from '../api/notificationApi';

interface Props {
  fcmToken: string;
}

const Stack = createNativeStackNavigator();

const Navigator: FC<Props> = ({ fcmToken }) => {
  const { isLoggedIn, userRole, loggedUser } = useContext(AuthContext);
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
        } catch (error: any) {
          console.log('Error updating device token', error.message);
        }
      };
      updateToken();
    }
  }, [fcmToken, isLoggedIn]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isSplash ? (
          <Stack.Screen name="Splash" component={Splash} />
        ) : !isLoggedIn ? (
          <Stack.Screen name="AuthNav" component={AuthNavigator} />
        ) : userRole === 'supervisor' && loggedUser.role === 'supervisor' ? (
          <Stack.Screen name="AdminNav" component={AdminNavigator} />
        ) : (
          <Stack.Screen name="MainNav" component={MainNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;