import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

const HomeScreen = ({ navigation }: any) => {
  const { setToken } = useContext(AuthContext);

  /**
   * 🧪 Test route protégée backend
   */
 const testProtectedRoute = async () => {
   try {
     const token = await AsyncStorage.getItem('token');

     console.log("TOKEN DEBUG =", token); // 👈 AJOUT IMPORTANT

     if (!token) {
       Alert.alert('Erreur', 'Token introuvable dans AsyncStorage');
       return;
     }

     const response = await fetch(
       'http://192.168.1.137:5000/api/test',
       {
         method: 'GET',
         headers: {
           Authorization: `Bearer ${token.trim()}`, // 👈 important
         },
       }
     );

     const text = await response.text();
     console.log('RAW RESPONSE:', text);

     const data = JSON.parse(text);

     Alert.alert('OK', JSON.stringify(data, null, 2));

   } catch (error: any) {
     console.log('ERROR:', error);
     Alert.alert('Erreur réseau', error.message);
   }
 };

  /**
   * 🚪 Logout propre
   */
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setToken(null);
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        🎭 Générateur de Memes
      </Text>

      <Text style={styles.subtitle}>
        Audio + Image + IA (Gemini bientôt)
      </Text>

      {/* 🎤 AUDIO */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AudioRecord')}
      >
        <Text style={styles.buttonText}>
          🎤 Démarrer un Meme Audio
        </Text>
      </TouchableOpacity>

      {/*Profil */}

      <TouchableOpacity
        style={[styles.button, { marginTop: 15 }]}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={styles.buttonText}>👤 Profil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { marginTop: 15, backgroundColor: '#6c757d' }]}
        onPress={() => navigation.navigate('History')}
      >
        <Text style={styles.buttonText}>📜 Historique</Text>
      </TouchableOpacity>

      {/* 🖼 IMAGE UPLOAD */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#ff9800', marginTop: 15 }]}
        onPress={() => navigation.navigate('ImageUpload')}
      >
        <Text style={styles.buttonText}>
          🖼 Upload Image
        </Text>
      </TouchableOpacity>

      {/* 🧪 TEST BACKEND */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#28a745', marginTop: 15 }]}
        onPress={testProtectedRoute}
      >
        <Text style={styles.buttonText}>
          🔐 Tester JWT / Backend
        </Text>
      </TouchableOpacity>

      {/* 🚪 LOGOUT */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#dc3545', marginTop: 15 }]}
        onPress={logout}
      >
        <Text style={styles.buttonText}>
          🚪 Logout
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default HomeScreen;

/**
 * 🎨 STYLES
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },

  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    width: '100%',
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});