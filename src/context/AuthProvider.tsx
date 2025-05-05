import React, {useState, useEffect, FC} from 'react';
import AuthContext from './AuthContext';
import {Alert} from 'react-native';
import {User} from '../Types';
import {getUser} from '../api/usersApi';
import {loginUser, registerUser, logoutUser} from '../api/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  children: React.ReactNode;
}

const AuthProvider: FC<Props> = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [reload, setReload] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<'user'|'admin'>('user');

  useEffect(() => {
    const checkAuth = async () => {
      const isLogged = await isAuthenticated();
      setIsLoggedIn(isLogged);
    };
    checkAuth();
  }, [isLoggedIn, reload]);

  const isAuthenticated = async () => {
    const user = await getUser();
    if (!user) {
      return false;
    }
    setIsLoggedIn(true);
    setLoggedUser(user);
    return true;
  };

  const handelLogin = async (email: string, password: string, role: 'user' | 'admin') => {
    try {
      const logInRes = await loginUser(email, password);
      AsyncStorage.setItem('token', logInRes.token);
      Alert.alert('Login Successful', 'Welcome back!');
      setUserRole(role);
      setReload(!reload);
    } catch (e: any) {
      Alert.alert('Login Error', e.response.data.error);
    }
  };

  const handelRegister = async (
    name: string,
    email: string,
    phoneNumber: string,
    password: string,
  ) => {
    try {
      const registerRes = await registerUser(
        name,
        email,
        phoneNumber,
        password,
      );
      if (registerRes.token) {
        Alert.alert('Success', 'User registered successfully!');
        return true;
      } else {
        return false;
      }
    } catch (e) {
      Alert.alert('Error', 'Something went wrong!');
      return false;
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    setIsLoggedIn(false);
    setLoggedUser(null);
    await AsyncStorage.removeItem('token');
    Alert.alert('Logout Successful', 'You have been logged out!');
  };

  return (
    <AuthContext.Provider
      value={{
        loggedUser,
        isLoggedIn,
        userRole,
        handleLogout,
        handelLogin,
        handelRegister,
        isAuthenticated,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
