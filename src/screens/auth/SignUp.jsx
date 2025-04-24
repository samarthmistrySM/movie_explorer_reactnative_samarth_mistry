import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import {styles} from './Login';
import {useNavigation} from '@react-navigation/native';
import AuthContext from '../../context/AuthContext';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();
  const {handelRegister} = useContext(AuthContext);

  const onSignUp = () =>{
    handelRegister(email, phoneNumber, password);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundContainer}>
        <Image
          source={require('../../assets/bg.png')}
          style={styles.backgroundImage}
        />
        <View style={styles.overlay}>
          <Text style={styles.logoText}>
            Movie <Text style={styles.highlight}>Explorer+</Text>
          </Text>
        </View>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.welcomeText}>Create Your Account</Text>

        <View>
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

        <TouchableOpacity style={styles.signInButton} activeOpacity={0.8} onPress={onSignUp}>
          <Text style={styles.signInButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.signUpLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styless = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundContainer: {
    position: 'relative',
    height: 400,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF3B30',
  },
  highlight: {
    color: '#FFFFFF',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
    justifyContent: 'space-around',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    marginBottom: 16,
    paddingLeft: 16,
  },
  inputIcon: {
    marginRight: 8,
    height: 20,
    width: 20,
    objectFit: 'contain',
    tintColor: '#888',
  },
  input: {
    height: 56,
    color: '#FFFFFF',
    flex: 1,
  },
  signInButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#8E8E93',
    fontSize: 14,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  signUpText: {
    color: '#8E8E93',
    fontSize: 14,
  },
  signUpLink: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '500',
  },
  dropdown: {
    height: 56,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 24,
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    outlineWidth: 0,
  },
  selectedTextStyle: {
    color: '#FFF',
    fontSize: 14,
    paddingVertical: 4,
  },
  dropdownItem: {
    padding: 16,
    backgroundColor: '#1C1C1E',
  },
  dropdownSelectedItem: {
    backgroundColor: '#FF3B30',
  },
  dropdownItemText: {
    color: '#FFF',
    fontSize: 15,
  },
});

export default SignUp;
