import React, {useEffect} from 'react';
import AuthProvider from './src/context/AuthProvider';
import Navigator from './src/navigation/Navigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StripeProvider} from '@stripe/stripe-react-native';
import Secret from './src/secrets/Secret';
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

const App = () => {
  useEffect(() => {
    requestNotificationPermissionAndroid();
  }, []);

  const requestNotificationPermissionAndroid = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      getToken();
    } else {
      console.log('Notification permission denied');
    }
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
  }

  return (
    <StripeProvider
      publishableKey={Secret.stripePublishableKey}
      merchantIdentifier="merchant.identifier"
      urlScheme="your-url-scheme">
      <GestureHandlerRootView>
        <AuthProvider>
          <Navigator />
        </AuthProvider>
      </GestureHandlerRootView>
    </StripeProvider>
  );
};

export default App;
