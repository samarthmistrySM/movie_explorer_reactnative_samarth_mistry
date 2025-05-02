import React, { useEffect } from 'react';
import AuthProvider from './src/context/AuthProvider';
import Navigator from './src/navigation/Navigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StripeProvider} from '@stripe/stripe-react-native';
import Secret from './src/secrets/Secret';

const App = () => {
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
