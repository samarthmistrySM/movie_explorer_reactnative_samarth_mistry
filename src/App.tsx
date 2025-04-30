import React from 'react';
import AuthProvider from './context/AuthProvider';
import Navigator from './navigation/Navigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StripeProvider} from '@stripe/stripe-react-native';
import Secret from './secrets/Secret';

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
