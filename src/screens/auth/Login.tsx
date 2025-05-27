import React, {useState, useContext, useEffect} from 'react';
import AuthContext from '../../context/AuthContext';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackPrams} from '../../navigation/Types.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {height} = Dimensions.get('window');

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<'user' | 'supervisor'>('user');
  const {handleLogin, isLoggedIn} = useContext(AuthContext);
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackPrams>>();

  const roles = [
    {label: 'User', value: 'user'},
    {label: 'Supervisor', value: 'supervisor'},
  ];

  const onLogin = () => {
    handleLogin(email, password, role);
  };

  const fetchRole = async () => {
    const fetchedRole: string | null = await AsyncStorage.getItem('role');

    if (fetchedRole === 'supervisor') {
      setRole('supervisor');
    } else {
      setRole('user');
    }
  };

  useEffect(() => {
    fetchRole();
  }, [isLoggedIn]);

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
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled">
        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>Welcome Back</Text>

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

            <Dropdown
              style={styles.dropdown}
              selectedTextStyle={styles.selectedTextStyle}
              data={roles}
              labelField="label"
              valueField="value"
              placeholder="Select role"
              value={role}
              onChange={item => setRole(item.value)}
              renderItem={item => (
                <View
                  testID="dropdownItem"
                  style={[
                    styles.dropdownItem,
                    item.value === role && styles.dropdownSelectedItem,
                  ]}>
                  <Text style={styles.dropdownItemText}>{item.label}</Text>
                </View>
              )}
            />
          </View>

          <TouchableOpacity
            style={styles.signInButton}
            activeOpacity={0.8}
            onPress={() => onLogin()}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <TouchableOpacity
              testID="signUpBtn"
              onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'space-around',
  },
  backgroundContainer: {
    position: 'relative',
    width: '100%',
    height: height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
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
    paddingHorizontal: 24,
    paddingBottom: 40,
    justifyContent: 'center',
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
    marginRight: 10,
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
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
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

export default Login;
