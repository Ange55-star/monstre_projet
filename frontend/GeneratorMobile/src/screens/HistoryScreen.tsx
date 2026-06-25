import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Meme = {
  id: number;
  title: string;
  createdAt: string;
};

const HistoryScreen = () => {
  const [memes, setMemes] = useState<Meme[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await AsyncStorage.getItem('memes');

      if (data) {
        setMemes(JSON.parse(data));
      }
    };

    load();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📜 Historique</Text>

      {memes.length === 0 ? (
        <Text>Aucun meme pour le moment</Text>
      ) : (
        <FlatList
          data={memes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.text}>{item.title}</Text>
              <Text style={styles.date}>{item.createdAt}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    padding: 15,
    backgroundColor: '#f2f2f2',
    marginBottom: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
});