/** Middleware d'authentification pour vérifier si l'utilisateur a un token JWT valide dans la requête */
import { Request, Response, NextFunction } from "express";
//Le module jsonwebtoken est utilisé pour travailler avec des tokens JWT. Ce module permet de créer, vérifier et décoder des tokens JWT.
import jwt from "jsonwebtoken";
//Bibliothèque pour hasher les mot de passes
import bcrypt from "bcrypt";


export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1]; // Extraire uniquement le token après "Bearer"

  if (!token) {
    res.status(401).json({ error: "Accès interdit. Token manquant." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    next(); // Passer au middleware suivant
  } catch (error) {
    res.status(401).json({ error: "Token invalide." });
  }
};

// Fonction pour hacher le mot de passe
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10); // Générer un "sel" (salt)
  const hashedPassword = await bcrypt.hash(password, salt); // Hacher le mot de passe
  return hashedPassword;
};
