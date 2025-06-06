import React, {useState, useEffect, FC} from 'react';
import AuthContext from './AuthContext';
import {Movie, User} from '../Types';
import {getUser} from '../api/usersApi';
import {loginUser, registerUser, logoutUser} from '../api/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import {fetchUserSubscription} from '../api/paymentApi';
import {Alert} from 'react-native';

interface Props {
  children: React.ReactNode;
}

const AuthProvider: FC<Props> = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [reload, setReload] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<'user' | 'supervisor'>('user');
  const [subscription, setSubscription] = useState('free plan');

  useEffect(() => {
    const checkAuth = async () => {
      const isLogged = await isAuthenticated();
      const role = await AsyncStorage.getItem('role');
      setIsLoggedIn(isLogged);
      setUserRole(role as 'user' | 'supervisor');
    };
    checkAuth();
    getUserSubscription();
    if (loggedUser && loggedUser.role === 'supervisor') {
      setSubscription('supervisor');
    }
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

  const handleLogin = async (
    email: string,
    password: string,
    role: 'user' | 'supervisor',
  ) => {
    try {
      const logInRes = await loginUser(email, password);
      AsyncStorage.setItem('token', logInRes.token);
      AsyncStorage.setItem('role', role);
      if (userRole === 'supervisor' && logInRes.role === 'user') {
        Toast.show(
          'You are not authorized to login as a supervisor, navigating to user',
          Toast.LONG,
        );
      } else {
        Toast.show('Login Successful, Welcome Back!', Toast.LONG);
      }
      setReload(!reload);
    } catch (e: any) {
      Toast.show('Invalid email or password!', Toast.LONG);
    }
  };

  const handleRegister = async (
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
        Toast.show('Registration Successful, Welcome!', Toast.LONG);
        return true;
      }
      return false;
    } catch (e: any) {
      // console.log('registration error:', e?.response?.data?.errors);

      const errors = e?.response?.data?.errors;
      let errorMessages: string[];

      if (Array.isArray(errors)) {
        errorMessages = errors.map((err: any) =>
          typeof err === 'string' ? err : JSON.stringify(err),
        );
      } else {
        errorMessages = [
          JSON.stringify(errors || e?.message || 'Registration failed'),
        ];
      }

      const toastMessage = errorMessages.join('\n\n* ');

      if (errorMessages.length > 1) {
        Alert.alert('What went wrong', `* ${toastMessage}`);
      } else {
        Toast.show(toastMessage, Toast.LONG);
      }

      return false;
    }
  };

  const getUserSubscription = async () => {
    try {
      if (isLoggedIn) {
        const res = await fetchUserSubscription();
        setSubscription(res.plan_type);
      }
    } catch (error: any) {
      // console.log(error.response);
      setSubscription(
        error.response.status === 404 ? 'supervisor' : 'free plan',
      );
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    setIsLoggedIn(false);
    setLoggedUser(null);
    await AsyncStorage.removeItem('token');
    Toast.show('Logout Successful!', Toast.TOP);
  };

  const update = () => {
    setReload(!reload);
  };

  return (
    <AuthContext.Provider
      value={{
        loggedUser,
        isLoggedIn,
        userRole,
        subscription,
        update,
        handleLogout,
        handleLogin,
        handleRegister,
        isAuthenticated,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
