import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }: any) => {

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

      console.log(data);

      Alert.alert(
        'Succès',
        JSON.stringify(data, null, 2)
      );

    } catch (error: any) {
      console.log(error);

      Alert.alert(
        'Erreur',
        error.message
      );
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Générateur de Memes
      </Text>

      <Text style={styles.subtitle}>
        Enregistrez votre voix pour créer un meme
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AudioRecord')}
      >
        <Text style={styles.buttonText}>
          Démarrer un nouveau Meme
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { marginTop: 15 }]}
        onPress={testProtectedRoute}
      >
        <Text style={styles.buttonText}>
          Tester JWT
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
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },

  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default HomeScreen;