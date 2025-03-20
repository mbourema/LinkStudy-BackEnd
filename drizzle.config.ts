import 'dotenv/config'; // Importation et chargement des variables d'environnement contenu dans le fichier .env (notamment DATABASE_URL)
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle', // Répertoire où Drizzle générera les fichiers après avoir exécuté les migrations
  schema: './src/db/schema.ts', //Chemin vers le fichier qui définit le schéma de la base de données
  dialect: 'postgresql', //Type de base de données utilisé
  dbCredentials: {
    url: process.env.DATABASE_URL!, //URL de connexion à la base de données
  },
});
