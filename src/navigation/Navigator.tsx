import React, {useContext, useEffect, useState} from 'react';
import MainNavigator from './MainStack';
import AuthNavigator from './AuthNavigator';
import {NavigationContainer} from '@react-navigation/native';
import AuthContext from '../context/AuthContext';
import Splash from '../screens/Splash';

const Navigator = () => {
  const {isLoggedIn} = useContext(AuthContext);
  const [isSplash, setIsSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isSplash) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default Navigator;
