// ======================================================
// Service API centralisé pour la communication avec le backend
// ======================================================

import axios from 'axios';

// Utilise l'adresse IP de ton ordinateur (remplace par ton IP locale)
// Pour Android, "localhost" ne fonctionne pas toujours, utilise ton IP locale
const API_URL = 'http://192.168.1.137:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Teste la connexion avec le serveur
 */
export const checkServerConnection = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('Erreur de connexion au serveur :', error);
    throw error;
  }
};

export default api;