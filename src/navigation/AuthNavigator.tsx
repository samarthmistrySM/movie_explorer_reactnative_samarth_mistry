import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../screens/auth/Login';
import SignUp from '../screens/auth/SignUp';

const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => {
    return (
        <AuthStack.Navigator screenOptions={{headerShown: false}}>
            <AuthStack.Screen name="Login" component={Login} />
            <AuthStack.Screen name="SignUp" component={SignUp} />
        </AuthStack.Navigator>
    );
};

export default AuthNavigator;
