import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';
import AudioRecordingScreen from '../screens/AudioRecordingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  const { token } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {token == null ? (
        // UTILISATEUR NON CONNECTÉ
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        // UTILISATEUR CONNECTÉ : Tous les écrans de l'app ici
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AudioRecord" component={AudioRecordingScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};