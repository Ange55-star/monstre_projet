require('dotenv').config();
const express = require('express');
const cors = require('cors'); // N'oubliez pas d'importer cors
const sequelize = require('./config/db');
const authRoutes = require('./routes/auth.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Synchronisation avec la base de données
sequelize.sync({ force: false })
  .then(() => console.log('Base de données synchronisée'))
  .catch(err => console.log('Erreur de synchronisation :', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));