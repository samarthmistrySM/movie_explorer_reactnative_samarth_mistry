import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import Profile from '../screens/Profile.tsx';
import SearchNavigator from './SearchStack.tsx';
import Subscription from '../screens/Subscription.tsx';

const house = require('../assets/house.fill.png');
const person = require('../assets/person.fill.png');
const magnifyingglass = require('../assets/magnifyingglass.png');
const bookmark = require('../assets/bookmark.fill.png');
const creditcard = require('../assets/creditcard.fill.png');

const MainTab = createBottomTabNavigator();

const Navigator = () => {
  return (
    <MainTab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {backgroundColor: '#000'},
        tabBarActiveTintColor: '#FF3B30',
        tabBarIcon: ({color, size}) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = house;
          } else if (route.name === 'SearchNav') {
            iconSource = magnifyingglass;
          }  else if (route.name === 'Subscription') {
              iconSource = creditcard;
          } else if (route.name === 'Watchlist') {
            iconSource = bookmark;
          } else if (route.name === 'Profile') {
            iconSource = person;
          }

          return (
            <Image
              source={iconSource}
              style={{
                width: size - 5,
                height: size - 5,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          );
        },
      })}>
      <MainTab.Screen name="Home" component={Home} />
      <MainTab.Screen
        name="SearchNav"
        component={SearchNavigator}
        options={{title: 'Search'}}
      />
      <MainTab.Screen name="Subscription" component={Subscription} />
      <MainTab.Screen name="Watchlist" component={Profile} />
      <MainTab.Screen name="Profile" component={Profile} />
    </MainTab.Navigator>
  );
};

export default Navigator;
