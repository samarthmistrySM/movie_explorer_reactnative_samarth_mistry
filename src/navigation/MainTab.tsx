import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Profile from '../screens/Profile.tsx';
import Subscription from '../screens/Subscription.tsx';
import WatchList from '../screens/WatchList.tsx';
import Home from '../screens/Home.tsx';
import Search from '../screens/Search.tsx';

const house = require('../assets/house.fill.png');
const person = require('../assets/person.fill.png');
const magnifyingglass = require('../assets/magnifyingglass.png');
const explore = require('../assets/safari.fill.png');
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
          } else if (route.name === 'Search') {
            iconSource = magnifyingglass;
          } else if (route.name === 'Subscription') {
            iconSource = creditcard;
          } else if (route.name === 'Explore') {
            iconSource = explore;
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
      <MainTab.Screen
        name="Home"
        component={Home}
        options={{title: 'Home'}}
      />
      <MainTab.Screen
        name="Search"
        component={Search}
        options={{title: 'Search'}}
      />
      <MainTab.Screen name="Subscription" component={Subscription} />
      <MainTab.Screen name="Explore" component={WatchList} />
      <MainTab.Screen name="Profile" component={Profile} />
    </MainTab.Navigator>
  );
};

export default Navigator;
