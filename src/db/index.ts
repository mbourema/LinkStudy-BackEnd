/** Configuration et gestion de la connexion à la base de données PostgreSQL en utilisant le client PostgreSQL natif (pg) ainsi que Drizzle ORM pour interagir avec la base de données */
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Création du client PostgreSQL
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
});

// Connexion Drizzle
export const db = drizzle(client);

// Fonction pour se connecter à PostgreSQL
export async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connexion PostgreSQL réussie !");
  } catch (error) {
    console.error("❌ Erreur de connexion à PostgreSQL :", error);
    process.exit(1); // Arrête le serveur en cas d'erreur
  }
}
