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
    navigation.navigate('Main');
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
        <Text style={styles.message}>
          Thank you for subscribing to MoviePlus
        </Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handleClick}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 20,
  },
  upperContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  icon: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#d3d3d3',
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '100%',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
