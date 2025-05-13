import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainTab from "./MainTab.tsx"
import Result from '../screens/Result';
import MovieDetails from '../screens/MovieDetails.tsx';
import Payment from '../screens/Payment.tsx';
import Success from "../screens/Success.tsx"

const MainStack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      <MainStack.Screen name="Main" component={MainTab} />
      <MainStack.Screen name="Result" component={Result} />
      <MainStack.Screen name="MovieDetails" component={MovieDetails} />
      <MainStack.Screen name="Payment" component={Payment} />
      <MainStack.Screen name="Success" component={Success} />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
