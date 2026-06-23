import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // On récupère la fonction du contexte
  const { setToken } = useContext(AuthContext);

  // VOICI LA CORRECTION : Le mot-clé 'async' est ici, avant la parenthèse
  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.1.137:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Sauvegarde sécurisée
        await AsyncStorage.setItem('token', data.token);
        // Mise à jour du contexte -> fait basculer la navigation vers Home automatiquement
        setToken(data.token);
      } else {
        Alert.alert('Erreur', data.error || data.message || 'Connexion échouée');
      }
    } catch (error: any) {
      console.error(error);
      Alert.alert('Erreur', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Connexion</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="email@gmail.com"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Mot de passe</Text>
      <TextInput
        placeholder="********"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button title="Se connecter" onPress={handleLogin} />

      <TouchableOpacity
        style={styles.registerLink}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.registerText}>Pas encore inscrit ? Créer un compte</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  label: { fontSize: 16, marginBottom: 5 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', marginBottom: 20, padding: 12, borderRadius: 8 },
  registerLink: { marginTop: 20, alignItems: 'center' },
  registerText: { color: '#007AFF', fontSize: 16 },
});

export default LoginScreen;