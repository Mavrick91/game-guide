const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connexion à la base de données réussie !');
  } catch (error) {
    console.error('Erreur de connexion à la base de données :', error);
  }
};

module.exports = { connectToDatabase, mongoose };
