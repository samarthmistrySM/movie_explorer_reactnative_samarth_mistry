import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainTab from "./MainTab.tsx"
import Result from '../screens/Result';
import MovieDetails from '../screens/MovieDetails.tsx';

const MainStack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      <MainStack.Screen name="Main" component={MainTab} />
      <MainStack.Screen name="Result" component={Result} />
      <MainStack.Screen name="MovieDetails" component={MovieDetails} />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
