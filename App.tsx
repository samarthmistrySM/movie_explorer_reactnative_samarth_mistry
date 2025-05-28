import React, {useEffect, useState} from 'react';
import AuthProvider from './src/context/AuthProvider';
import Navigator from './src/navigation/Navigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PermissionsAndroid} from 'react-native';
import {
  getMessaging,
  getToken,
  onMessage,
} from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import {WatchListProvider} from './src/context/WatchListContext';

const App = () => {
  const [fcmToken, setFcmToken] = useState<string>('');
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
      const {notification} = remoteMessage;

      Alert.alert(
        notification?.title || 'No Title',
        notification?.body || 'No Message',
      );
    });

    return unsubscribe;
  }, []);

  const getFCMToken = async () => {
    try {
      const token = await getToken(messagingInstance);
      setFcmToken(token);
    } catch (error) {
      console.error('Error retrieving FCM token:', error);
    }
  };

  return (
    <GestureHandlerRootView>
      <AuthProvider>
        <WatchListProvider>
          <Navigator fcmToken={fcmToken} />
        </WatchListProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default App;
