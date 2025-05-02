import React, {useContext} from 'react';
import MainNavigator from './MainStack';
import AuthNavigator from './AuthNavigator';
import {NavigationContainer} from '@react-navigation/native';
import AuthContext from '../context/AuthContext';

const Navigator = () => {
    const {isLoggedIn,handleLogout} = useContext(AuthContext);
    // handleLogout();
    return (
        <NavigationContainer>
            {isLoggedIn ? <MainNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
};


export default Navigator;
