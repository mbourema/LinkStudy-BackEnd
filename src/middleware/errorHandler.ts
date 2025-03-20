/**
Middleware qui permet de centraliser la gestion des erreurs dans ton application, d'assurer que toutes les erreurs sont correctement loguées, et de renvoyer une réponse appropriée au client.
 */

import { Request, Response, NextFunction } from "express";

//L'objet err représente l'erreur qui a été lancée quelque part dans ton application
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Erreur serveur." });
};
