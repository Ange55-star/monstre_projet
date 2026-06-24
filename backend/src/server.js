require('dotenv').config();

const express = require('express');
const cors = require('cors');

const sequelize = require('./config/db');

const authRoutes = require('./routes/auth.routes');
const testRoutes = require('./routes/test.routes');
const imageRoutes = require('./routes/image.routes');

const app = express();

/*
|--------------------------------------------------------------------------
| Middlewares
|--------------------------------------------------------------------------
*/
app.use(cors());
app.use(express.json());

/*
|--------------------------------------------------------------------------
| Fichiers statiques
|--------------------------------------------------------------------------
*/
app.use('/uploads', express.static('uploads'));

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/
app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);
app.use('/api/images', imageRoutes);

/*
|--------------------------------------------------------------------------
| Base de données
|--------------------------------------------------------------------------
*/
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Base de données synchronisée');
  })
  .catch(err => {
    console.log('Erreur de synchronisation :', err);
  });

/*
|--------------------------------------------------------------------------
| Serveur
|--------------------------------------------------------------------------
*/
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});