import React, {useContext,useEffect} from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import AuthContext from '../context/AuthContext';

const Profile = () => {
    const {loggedUser} = useContext(AuthContext);
    useEffect(() => {
        console.log(loggedUser);
    },[])
    return (
        <SafeAreaView style={styles.container}>
            <Text>Welcome to {loggedUser.name}'s profile</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Profile;
