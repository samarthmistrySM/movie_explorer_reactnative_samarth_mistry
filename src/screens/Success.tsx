import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParams} from '../navigation/Types';
import {useNavigation} from '@react-navigation/native';
import AuthContext from '../context/AuthContext';

const Success = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParams>>();

  const {update} = useContext(AuthContext);

  const handleClick = () => {
    update();
    navigation.replace('Main');
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Image
          source={{
            uri: 'https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/83-512.png',
          }}
          style={styles.icon}
        />
        <Text style={styles.title}>Subscription Successful!</Text>
        <Text style={styles.subtitle}>Welcome to MoviePlus Premium</Text>
        <Text style={styles.message}>
          Thank you for subscribing to MoviePlus. Enjoy unlimited movies and exclusive content!
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleClick}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#181818',
    padding: 24,
  },
  upperContainer: {
    alignItems: 'center',
    marginBottom: 40,
    width: '100%',
  },
  celebrate: {
    fontSize: 40,
    marginBottom: 10,
  },
  icon: {
    width: 110,
    height: 110,
    marginBottom: 18,
    borderRadius: 55,
    backgroundColor: '#232323',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2ecc40',
    marginBottom: 6,
    textAlign: 'center',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
    opacity: 0.85,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#d3d3d3',
    paddingHorizontal: 12,
    lineHeight: 22,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2ecc40',
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 30,
    width: '90%',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
  },
});