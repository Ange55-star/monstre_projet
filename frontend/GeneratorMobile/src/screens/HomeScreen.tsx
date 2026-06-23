import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Générateur de Memes</Text>
      <Text style={styles.subtitle}>Enregistrez votre voix pour créer un meme</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert("Prochaine étape", "Enregistrement audio en cours de configuration")}
      >
        <Text style={styles.buttonText}>Démarrer un nouveau Meme</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 30 },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10 },
  buttonText: { color: '#fff', fontSize: 18 }
});

export default HomeScreen;