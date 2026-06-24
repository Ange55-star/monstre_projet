import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

const HomeScreen = ({ navigation }: any) => {
  const { logout } = useContext(AuthContext);

  const testProtectedRoute = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const response = await fetch(
        'http://192.168.1.137:5000/api/test',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      Alert.alert(
        'JWT OK ✅',
        JSON.stringify(data, null, 2)
      );

    } catch (error: any) {
      Alert.alert('Erreur', error.message);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        🎭 Générateur de Memes
      </Text>

      <Text style={styles.subtitle}>
        Audio + Image + IA (bientôt Gemini)
      </Text>

      {/* 🎤 AUDIO MEME */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AudioRecord')}
      >
        <Text style={styles.buttonText}>
          🎤 Démarrer un Meme Audio
        </Text>
      </TouchableOpacity>

      {/* 🧪 TEST JWT */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#28a745', marginTop: 15 }]}
        onPress={testProtectedRoute}
      >
        <Text style={styles.buttonText}>
          🔐 Tester JWT
        </Text>
      </TouchableOpacity>

      {/* 🖼 IMAGE UPLOAD (future screen) */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#ff9800', marginTop: 15 }]}
        onPress={() => navigation.navigate('ImageUpload')}
      >
        <Text style={styles.buttonText}>
          🖼 Upload Image
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5'
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10
  },

  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center'
  },

  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    width: '100%'
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  }
});

export default HomeScreen;