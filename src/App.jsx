import React from 'react';
import Navigator from './navigation/Navigator';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
  );
};

export default App;
