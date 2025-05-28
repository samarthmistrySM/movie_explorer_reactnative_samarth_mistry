import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { MainTabsParams} from '../navigation/Types';
import {useNavigation} from '@react-navigation/native';

const Failure = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainTabsParams>>();

  const handleClick = () => {
    navigation.replace('Main',{
        screen: 'Subscription'
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Image
          source={{
            uri: 'https://static-00.iconduck.com/assets.00/failure-icon-256x256-2uiej3rj.png',
          }}
          style={styles.icon}
        />
        <Text style={styles.title}>Subscription Canceled</Text>
        <Text style={styles.subtitle}>Oops! Something went wrong.</Text>
        <Text style={styles.message}>
          Your subscription could not be completed. Please try again or contact support if the issue persists.
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleClick}>
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Failure;

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
  icon: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF3B30',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
    opacity: 0.8,
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
    backgroundColor: '#FF3B30',
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 30,
    width: '90%',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
  },
});