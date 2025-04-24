import React, {useState, useEffect} from 'react';
import AuthContext from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

const AuthProvider = ({children}) => {
    const [users, setUsers] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedUser, setLoggedUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await AsyncStorage.getItem('users') || [];
                setUsers(JSON.parse(fetchedUsers));
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

    const handelLogin = async (email, password) => {
        try {
            const user = users.find(u => u.email === email);
            console.log(user);
            if (!user) {
                Alert.alert('Error', 'user does not exist!');
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

    const handelRegister = async (email, phoneNumber, password) => {
        try {
            const userExist = users.find(u => u.email === email);
            if (userExist) {
                Alert.alert('Error', 'user already exist! Try Login instead!');
            }
            const newUser = {email, phoneNumber, password};
            const updatedUser = [...users, newUser];
            await AsyncStorage.setItem('users', JSON.stringify(updatedUser));
            setUsers(updatedUser);
            Alert.alert('Success', 'user created! Try Login..');
        } catch (e) {
            console.log(e);
            Alert.alert('Error', 'Something went wrong!');
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
