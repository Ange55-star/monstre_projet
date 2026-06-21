import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { checkServerConnection } from './src/services/api';

export default function App() {
  const [message, setMessage] = useState('Connexion en cours...');

  useEffect(() => {
    checkServerConnection()
      .then((data) => setMessage(data.message))
      .catch(() => setMessage('Erreur : Impossible de contacter le serveur'));
  }, []);

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
});