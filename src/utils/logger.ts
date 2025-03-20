import winston from "winston";

// Définition des formats
const logFormat = winston.format.combine(
  winston.format.timestamp(), // Ajoute un timestamp
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level.toUpperCase()}] - ${message}`;
  })
);

// Création du logger Winston
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(), // Format par défaut JSON
  transports: [
    // Console : affichage des logs en mode développement
    new winston.transports.Console({
      format: process.env.NODE_ENV === "production" ? winston.format.json() : logFormat,
    }),
    // Fichier : stockage des logs globaux
    new winston.transports.File({ filename: "logs/combined.log" }),
    // Fichier : stockage des erreurs uniquement
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
  ],
});

// Si on est en développement, on affiche aussi dans la console en format lisible
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: logFormat,
    })
  );
}

export default logger;

