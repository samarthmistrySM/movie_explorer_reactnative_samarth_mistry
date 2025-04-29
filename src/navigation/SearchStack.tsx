import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Search from '../screens/Search.tsx';
import Result from '../screens/Result';

const SearchStack = createNativeStackNavigator();

const SearchNavigator = () => {
  return (
    <SearchStack.Navigator screenOptions={{headerShown: false}}>
      <SearchStack.Screen name="Search" component={Search} />
      <SearchStack.Screen name="Result" component={Result} />
    </SearchStack.Navigator>
  );
};

export default SearchNavigator;
