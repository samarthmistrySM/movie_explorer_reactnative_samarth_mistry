import React, {useContext,useEffect} from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import AuthContext from '../context/AuthContext';

const Home = () => {
  const {loggedUser} = useContext(AuthContext);
  useEffect(() => {
    console.log(loggedUser);
  },[])
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello {loggedUser.name}</Text>
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

export default Home;
