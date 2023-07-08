require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passportConfig = require('./config/passport');
const routes = require('./routes');
const { connectToDatabase } = require('./database');

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());
app.use(passportConfig.initialize());

app.use('/auth', routes.auth);
app.use('/user', routes.user);
app.use('/games', routes.games);
app.use('/friends', routes.friends);

app.use((err, req, res) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  })
  .catch((error) => {
    console.error('Erreur lors de la connexion à la base de données :', error);
  });
