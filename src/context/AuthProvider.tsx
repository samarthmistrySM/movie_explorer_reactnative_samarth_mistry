import React, {useState, useEffect, FC} from 'react';
import AuthContext from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {User} from '../Types';

interface Props {
  children: React.ReactNode;
}

const AuthProvider: FC<Props> = ({children}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await AsyncStorage.getItem('users');
        if (fetchedUsers) {
          setUsers(JSON.parse(fetchedUsers) as User[]);
        } else {
          setUsers([]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
    const checkAuth = async () => {
      const isLogged = await isAuthenticated();
      setIsLoggedIn(isLogged);
    };
    checkAuth();
  }, [isLoggedIn]);

  const isAuthenticated = async () => {
    const user = await AsyncStorage.getItem('loggedUser');
    if (!user) {
      return false;
    }
    setIsLoggedIn(true);
    setLoggedUser(JSON.parse(user));
    return true;
  };

  const handelLogin = async (email: string, password: string) => {
    try {
      const user = users.find(u => u.email === email) as User;

      if (!user) {
        Alert.alert('Error', 'user does not exist!');
        return;
      }
      if (user.password === password) {
        setIsLoggedIn(true);
        setLoggedUser(user);
        await AsyncStorage.setItem('loggedUser', JSON.stringify(user));
      } else {
        Alert.alert('Error', 'Invalid password Try again!');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Something went wrong!');
    }
  };

  const handelRegister = async (
    name: string,
    email: string,
    phoneNumber: string,
    password: string,
  ) => {
    try {
      const userExist = users.find(u => u.email === email);
      if (userExist) {
        Alert.alert('Error', 'user already exist! Try Login instead!');
        return false;
      }
      const newUser = {name, email, phoneNumber, password};
      const updatedUser = [...users, newUser];
      await AsyncStorage.setItem('users', JSON.stringify(updatedUser));
      setUsers(updatedUser as User[]);
      Alert.alert('Success', 'user created! Try Login..');
      return true;
    } catch (e) {
      console.log(e);
      Alert.alert('Error', 'Something went wrong!');
      return false;
    }
  };

  const handleLogout = async () => {
    setLoggedUser(null);
    setIsLoggedIn(false);
    await AsyncStorage.removeItem('loggedUser');
  };

  return (
    <AuthContext.Provider
      value={{
        loggedUser,
        isLoggedIn,
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
