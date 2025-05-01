import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MovieDetails from '../screens/MovieDetails.tsx';
import Home from '../screens/Home.tsx';

const HomeStack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="MovieDetails" component={MovieDetails} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
