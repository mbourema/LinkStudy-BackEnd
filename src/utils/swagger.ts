import { Express } from "express";
import swaggerJSDoc from "swagger-jsdoc"; // Bibliothèque qui permet de générer un fichier de spécification Swagger au format JSON ou YAML en analysant les annotations présentes dans le code (les commentaires @swagger).
import swaggerUi from "swagger-ui-express"; // Bibliothèque qui permet d'intégrer une interface graphique pour visualiser la documentation Swagger dans l'application Express.

// Définition des options Swagger
const options = {
  definition: {
    openapi: "3.0.0", // Spécifie la version de l'OpenAPI (Swagger)
    info: {
      title: "API LinkStudy",
      version: "1.0.0",
      description: "Documentation de l'API avec Swagger", // Info générale sur l'API
    },
    servers: [
      {
        url: "http://localhost:5000", // L'URL du serveur pour Swagger
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Emplacement des fichiers à analyser pour générer la documentation
};

// Utilisation des options définies plus haut pour générer la documentation Swagger sous forme de spécification JSON
const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  /** Middleware Express qui sert l'interface utilisateur Swagger à l'URL /api-docs. Il utilise swaggerUi.serve pour rendre l'interface graphique, et swaggerUi.setup(swaggerSpec) pour lier
  la spécification Swagger générée avec l'interface. Cela permet de visualiser et interagir avec la documentation de l'API directement dans un navigateur. */
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📄 Swagger disponible sur : http://localhost:5000/api-docs");
};
