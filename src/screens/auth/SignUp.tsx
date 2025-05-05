import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ImageBackground,
} from 'react-native';
import {styles} from './Login';
import {useNavigation} from '@react-navigation/native';
import AuthContext from '../../context/AuthContext';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackPrams} from '../../navigation/Types.ts';

const SignUp = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [name, setName] = useState<string>('');
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackPrams>>();
  const {handelRegister} = useContext(AuthContext);

  const onSignUp = async () => {
    const isSignedUp = await handelRegister(name, email, phoneNumber, password);

    if (isSignedUp) {
      navigation.navigate('Login');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../assets/bg.png')}
        resizeMode="cover"
        style={styles.backgroundContainer}>
        <View style={styles.overlay}>
          <Text style={styles.logoText}>
            Movie <Text style={styles.highlight}>Explorer+</Text>
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.formContainer}>
        <Text style={styles.welcomeText}>Create Your Account</Text>

        <View>
          <View style={styles.inputContainer}>
            <Image
              source={require('../../assets/person.fill.png')}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#888"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Image
              source={require('../../assets/mail.fill.png')}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Image
              source={require('../../assets/phone.fill.png')}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="#888"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType={'numeric'}
            />
          </View>

          <View style={styles.inputContainer}>
            <Image
              source={require('../../assets/lock.fill.png')}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#888"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.signInButton}
          activeOpacity={0.8}
          onPress={onSignUp}>
          <Text style={styles.signInButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Already have an account? </Text>
          <TouchableOpacity
            testID="goBackBtn"
            onPress={() => navigation.goBack()}>
            <Text style={styles.signUpLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
