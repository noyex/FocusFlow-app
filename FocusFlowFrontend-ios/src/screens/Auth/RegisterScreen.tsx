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
  Login: undefined;
};

const RegisterScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Tutaj będzie logika rejestracji
    console.log('Register attempt with:', { name, email, password, confirmPassword });
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
                  <Text style={authStyles.title}>Stwórz konto</Text>
                  <Text style={authStyles.subtitle}>Dołącz do FocusFlow już dziś</Text>
                </View>

                <View style={authStyles.form}>
                  <View style={authStyles.inputContainer}>
                    <Text style={authStyles.inputLabel}>Imię</Text>
                    <TextInput
                      style={authStyles.input}
                      placeholder="Twoje imię"
                      placeholderTextColor="rgba(255,255,255,0.5)"
                      autoCorrect={false}
                      value={name}
                      onChangeText={setName}
                    />
                  </View>

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
                      placeholder="Minimum 8 znaków"
                      placeholderTextColor="rgba(255,255,255,0.5)"
                      secureTextEntry
                      value={password}
                      onChangeText={setPassword}
                    />
                  </View>

                  <View style={authStyles.inputContainer}>
                    <Text style={authStyles.inputLabel}>Potwierdź hasło</Text>
                    <TextInput
                      style={authStyles.input}
                      placeholder="Powtórz hasło"
                      placeholderTextColor="rgba(255,255,255,0.5)"
                      secureTextEntry
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                    />
                  </View>

                  <TouchableOpacity style={authStyles.button} onPress={handleRegister}>
                    <Text style={authStyles.buttonText}>Zarejestruj się</Text>
                  </TouchableOpacity>

                  <View style={authStyles.footer}>
                    <Text style={authStyles.footerText}>Masz już konto?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                      <Text style={authStyles.footerLink}>Zaloguj się</Text>
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

export default RegisterScreen;