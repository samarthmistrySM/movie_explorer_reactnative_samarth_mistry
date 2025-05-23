import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';

import Admin from '../screens/Admin';
import Profile from '../screens/Profile';

const person = require('../assets/person.fill.png');
const dashboard = require("../assets/rectangle.grid.2x2.fill.png")

const AuthTab = createBottomTabNavigator();

const AdminNavigator = () => {
    return (
        <AuthTab.Navigator screenOptions={({route}) => ({
            headerShown: false,
            tabBarStyle: {backgroundColor: '#000'},
            tabBarActiveTintColor: '#FF3B30',
            tabBarIcon: ({color, size}) => {
              let iconSource;
    
              if (route.name === 'Dashboard') {
                iconSource = dashboard;
              }  else if (route.name === 'Profile') {
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
            <AuthTab.Screen name="Dashboard" component={Admin} />
            <AuthTab.Screen name="Profile" component={Profile} />
        </AuthTab.Navigator>
    );
};

export default AdminNavigator;
