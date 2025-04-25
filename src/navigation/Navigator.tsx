import React, {useContext} from 'react';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import {NavigationContainer} from '@react-navigation/native';
import AuthContext from '../context/AuthContext';

const Navigator = () => {
    const {isLoggedIn} = useContext(AuthContext);
    return (
        <NavigationContainer>
            {isLoggedIn ? <MainNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
};


export default Navigator;
