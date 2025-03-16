import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { homeStyles } from '../../styles/homeStyles';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

type IconName = 'timer-outline' | 'playlist-check' | 'chart-line' | 'login' | 'account-plus';

const FEATURES: Array<{ icon: IconName; text: string }> = [
  { icon: 'timer-outline', text: 'Pomodoro Timer' },
  { icon: 'playlist-check', text: 'Task Lists' },
  { icon: 'chart-line', text: 'Progress Analytics' },
];

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(100);
  const scaleAnim = new Animated.Value(0.3);
  const featuresAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(featuresAnim, {
        toValue: 1,
        duration: 800,
        delay: 400,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <SafeAreaView style={homeStyles.container}>
      <StatusBar barStyle="light-content" />
      <View style={homeStyles.gradientBackground}>
        <LinearGradient
          colors={['#1a1a1a', '#2D2D2D']}
          style={{ flex: 1 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </View>
      <View style={homeStyles.content}>
        <Animated.View 
          style={[
            homeStyles.header,
            { 
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <View style={homeStyles.logoContainer}>
            <MaterialCommunityIcons name="timer-outline" size={48} color="#FFFFFF" />
          </View>
          <Text style={homeStyles.title}>FocusFlow</Text>
          <Text style={homeStyles.motto}>Master Your Focus, Simplify Your Day</Text>
        </Animated.View>

        <Animated.View 
          style={[
            homeStyles.featuresContainer,
            {
              opacity: featuresAnim,
              transform: [{ translateY: featuresAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0]
              })}]
            }
          ]}
        >
          {FEATURES.map((feature, index) => (
            <View key={feature.text} style={homeStyles.featureItem}>
              <MaterialCommunityIcons name={feature.icon} size={20} color="#FFFFFF" />
              <Text style={homeStyles.featureText}>{feature.text}</Text>
            </View>
          ))}
        </Animated.View>
        
        <Animated.View 
          style={[
            homeStyles.buttonContainer,
            { 
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <TouchableOpacity
            style={homeStyles.primaryButton}
            onPress={() => navigation.navigate('Login')}
          >
            <MaterialCommunityIcons name="login" size={20} color="#000000" />
            <Text style={homeStyles.primaryButtonText}>Sign In</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={homeStyles.secondaryButton}
            onPress={() => navigation.navigate('Register')}
          >
            <MaterialCommunityIcons name="account-plus" size={20} color="#FFFFFF" />
            <Text style={homeStyles.secondaryButtonText}>Create Account</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;