import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { authStyles } from '../../styles/authStyles';

type RootStackParamList = {
  Home: undefined;
  Register: undefined;
};

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Tutaj będzie logika logowania
    console.log('Login attempt with:', { email, password });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={authStyles.container}>
        <LinearGradient
          colors={['#1a1a1a', '#2D2D2D']}
          style={{ flex: 1 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView 
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ flex: 1 }}
            >
              <View style={authStyles.content}>
                <View style={authStyles.header}>
                  <Text style={authStyles.title}>Witaj ponownie</Text>
                  <Text style={authStyles.subtitle}>Zaloguj się do swojego konta</Text>
                </View>

                <View style={authStyles.form}>
                  <View style={authStyles.inputContainer}>
                    <Text style={authStyles.inputLabel}>Email</Text>
                    <TextInput
                      style={authStyles.input}
                      placeholder="Twój adres email"
                      placeholderTextColor="rgba(255,255,255,0.5)"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      value={email}
                      onChangeText={setEmail}
                    />
                  </View>

                  <View style={authStyles.inputContainer}>
                    <Text style={authStyles.inputLabel}>Hasło</Text>
                    <TextInput
                      style={authStyles.input}
                      placeholder="Twoje hasło"
                      placeholderTextColor="rgba(255,255,255,0.5)"
                      secureTextEntry
                      value={password}
                      onChangeText={setPassword}
                    />
                  </View>

                  <TouchableOpacity style={authStyles.forgotPassword}>
                    <Text style={authStyles.forgotPasswordText}>Zapomniałeś hasła?</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={authStyles.button} onPress={handleLogin}>
                    <Text style={authStyles.buttonText}>Zaloguj się</Text>
                  </TouchableOpacity>

                  <View style={authStyles.footer}>
                    <Text style={authStyles.footerText}>Nie masz jeszcze konta?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                      <Text style={authStyles.footerLink}>Zarejestruj się</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;