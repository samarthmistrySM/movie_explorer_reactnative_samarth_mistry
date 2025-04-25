import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/Home';

const MainStack = createNativeStackNavigator();

const Navigator = () => {
    return (
        <MainStack.Navigator screenOptions={{headerShown: true}}>
            <MainStack.Screen name="Home" component={Home} />
        </MainStack.Navigator>
    );
};

export default Navigator;
