/** Middleware d'authentification pour vérifier si l'utilisateur a un token JWT valide dans la requête */
import { Request, Response, NextFunction } from "express";
//Le module jsonwebtoken est utilisé pour travailler avec des tokens JWT. Ce module permet de créer, vérifier et décoder des tokens JWT.
import jwt from "jsonwebtoken";
//Bibliothèque pour hasher les mot de passes
import bcrypt from "bcrypt";


export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Accès interdit. Token manquant." });
  }
  //Si un token est trouvé, le middleware tente de le vérifier à l'aide de la méthode jwt.verify()
  try {
    //Fonction qui vérifie la validité du token en le décodant avec la clé secrète définie dans les variables d'environnement
    //Si le token est valide, jwt.verify renvoie les données décodées
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalide." });
  }
};

// Fonction pour hacher le mot de passe
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10); // Générer un "sel" (salt)
  const hashedPassword = await bcrypt.hash(password, salt); // Hacher le mot de passe
  return hashedPassword;
};

// Fonction pour vérifier si un mot de passe correspond à un mot de passe haché
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword); // Comparer le mot de passe en clair avec le haché
};
