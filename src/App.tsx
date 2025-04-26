import React from 'react';
import AuthProvider from './context/AuthProvider';
import Navigator from './navigation/Navigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
const App = () => {
  return (
    <GestureHandlerRootView>
      <AuthProvider>
        <Navigator />
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default App;
