// ======================================================
// Fichier principal du serveur Backend
// Responsable de l'initialisation d'Express et du routage
// ======================================================

import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Chargement des variables d'environnement (clés API, ports)
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Autorise la communication entre ton mobile et le serveur
app.use(express.json()); // Permet de recevoir des données au format JSON

// Route de test simple
// Permet de vérifier que le serveur est bien lancé
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Le serveur fonctionne parfaitement !' });
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});