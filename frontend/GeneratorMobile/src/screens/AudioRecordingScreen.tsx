import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
//import { Audio } from 'expo-av';

const AudioRecordingScreen = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [lastUri, setLastUri] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepareAudio = async () => {
      try {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission requise', 'L\'accès au micro est nécessaire.');
        }
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
        });
        setIsReady(true);
      } catch (err) {
        console.error("Erreur init audio:", err);
      }
    };
    prepareAudio();
  }, []);

  async function startRecording() {
    try {
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      setRecording(recording);
    } catch (err) {
      Alert.alert('Erreur', 'Impossible de démarrer l\'enregistrement');
    }
  }

  async function stopRecording() {
    if (!recording) return;
    await recording.stopAndUnloadAsync();
    setLastUri(recording.getURI());
    setRecording(null);
  }

  if (!isReady) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Générateur de Memes</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: recording ? '#d32f2f' : '#388e3c' }]}
        onPress={recording ? stopRecording : startRecording}
      >
        <Text style={styles.buttonText}>{recording ? 'Arrêter' : 'Démarrer'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  button: { padding: 20, borderRadius: 10 },
  buttonText: { color: 'white', fontSize: 18 }
});

export default AudioRecordingScreen;