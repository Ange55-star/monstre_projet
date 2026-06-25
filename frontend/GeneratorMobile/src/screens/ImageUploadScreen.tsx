import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';

const BACKEND_URL = 'http://192.168.1.137:5000';

const ImageUploadScreen = () => {
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  /**
   * 📸 Sélection image
   */
  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (result.didCancel) return;

    const asset = result.assets?.[0];

    if (!asset?.uri) {
      Alert.alert('Erreur', 'Image invalide');
      return;
    }

    setImage(asset);
  };

  /**
   * 🚀 Upload image vers backend
   */
  const uploadImage = async () => {
    try {
      if (!image?.uri) {
        Alert.alert('Erreur', 'Aucune image sélectionnée');
        return;
      }

      setLoading(true);

      const token = await AsyncStorage.getItem('token');

      if (!token) {
        Alert.alert('Erreur', 'Token manquant');
        return;
      }

      const formData = new FormData();

      formData.append('image', {
        uri: image.uri,
        name: image.fileName || 'photo.jpg',
        type: image.type || 'image/jpeg',
      } as any);

      const response = await fetch(`${BACKEND_URL}/api/images/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const text = await response.text();
      console.log('SERVER RESPONSE:', text);

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error('Réponse serveur invalide');
      }

      if (response.ok) {
        Alert.alert('Succès ✅', data.message);
      } else {
        Alert.alert('Erreur', data.message || 'Upload failed');
      }

    } catch (error: any) {
      console.log('UPLOAD ERROR:', error);
      Alert.alert('Erreur réseau', error.message || 'Network failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Upload Image 🖼</Text>

      {image && (
        <Image
          source={{ uri: image.uri }}
          style={styles.preview}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Choisir image</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#28a745', marginTop: 15 }]}
        onPress={uploadImage}
      >
        <Text style={styles.buttonText}>Uploader</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}

    </View>
  );
};

export default ImageUploadScreen;

/**
 * 🎨 STYLE
 */
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
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },

  preview: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
});