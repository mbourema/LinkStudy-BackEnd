import express from "express";
import router from "./routes/users";
import { connectDB } from "./db/index";
import { errorHandler } from "./middleware/errorHandler";
import { setupSwagger } from "./utils/swagger";
import dotenv from "dotenv";
import cors from "cors";

// Charger les variables d'environnement
dotenv.config();

export const app = express(); // Instance d'express qui sera utilisée pour définir des routes et des middlewares et gerer les requêtes http

/** Middleware pour parser le JSON, soit permettre à l'application Express de comprendre et traiter les requêtes contenant des données en format JSON.
Cela va automatiquement analyser les corps des requêtes et les rendre accessible via req.body
*/
app.use(express.json());

// Configuration de CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Autorisation du frontend à accéder à l'API
  methods: 'GET,POST,PUT,DELETE', // Les méthodes HTTP autorisées
  allowedHeaders: 'Content-Type,Authorization', // Les en-têtes autorisés
};
app.use(cors(corsOptions)); // Ajoute CORS à l'application Express

// Appel de setupSwagger qui se trouve dans le fichier ./utils/swagger pour configurer swagger.
setupSwagger(app);

// Router pour gerer les routes sous user
app.use("/users", router);

// Middleware pour gerer les erreurs globalement dans l'application
app.use(errorHandler);

// Connection à la base de données et démarrage du serveur
const PORT = process.env.PORT || 5000; // Fonction qui se connecte à la base de données. Elle est exécutée avant de démarrer le serveur pour s'assurer
// que l'application est bien connectée à la base de données avant de recevoir des requêtes.
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
  console.log(`📄 Swagger Docs: http://localhost:${PORT}/api-docs`);
});
