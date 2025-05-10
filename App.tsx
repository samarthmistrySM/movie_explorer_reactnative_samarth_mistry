import React, {useEffect, useState} from 'react';
import AuthProvider from './src/context/AuthProvider';
import Navigator from './src/navigation/Navigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StripeProvider} from '@stripe/stripe-react-native';
import Secret from './src/secrets/Secret';
import {PermissionsAndroid} from 'react-native';
import {
  getMessaging,
  getToken,
  onMessage,
} from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

const App = () => {
  const [fcmToken,setFcmToken] = useState<string>('');
  const messagingInstance = getMessaging();

  useEffect(() => {
    requestNotificationPermissionAndroid();
  }, []);

  const requestNotificationPermissionAndroid = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      getFCMToken();
    } else {
      console.log('Notification permission denied');
    }
  };

  useEffect(() => {
    const unsubscribe = onMessage(messagingInstance, async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  const getFCMToken = async () => {
    try {
      const token = await getToken(messagingInstance);
      console.log('FCM Token:', token);
      setFcmToken(token);
    } catch (error) {
      console.error('Error retrieving FCM token:', error);
    }
  };

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
