import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import AudioRecorder from 'react-native-audio-recorder';

const AudioRecordingScreen = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioFile, setAudioFile] = useState<string | null>(null);

  const startRecording = async () => {
    try {
      await AudioRecorder.startRecording();
      setIsRecording(true);
    } catch (error) {
      console.log(error);
      Alert.alert('Erreur', "Impossible de démarrer l'enregistrement");
    }
  };

  const stopRecording = async () => {
    try {
      const filePath = await AudioRecorder.stopRecording();
      setIsRecording(false);
      setAudioFile(filePath);

      Alert.alert('Succès', 'Audio enregistré');
      console.log('Audio:', filePath);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Audio Recorder</Text>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isRecording ? '#d32f2f' : '#388e3c' },
        ]}
        onPress={isRecording ? stopRecording : startRecording}
      >
        <Text style={styles.buttonText}>
          {isRecording ? 'Arrêter' : 'Démarrer'}
        </Text>
      </TouchableOpacity>

      {audioFile && (
        <Text style={styles.path}>
          Fichier : {audioFile}
        </Text>
      )}
    </View>
  );
};

export default AudioRecordingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    padding: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  path: {
    marginTop: 20,
    fontSize: 12,
    color: '#555',
  },
});