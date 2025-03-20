/** Utilisation de la bibliothèque Zod pour définir un schéma de validation des données et s'assurer que la structure des données envoyées dans le corps de la requête (req.body)
est correcte avant de les passer à la prochaine étape du traitement. */
import { Request, Response, NextFunction } from "express";
import { z } from "zod"; // Zod est une bibliothèque de validation et de parsing de données pour TypeScript. 

/**
z.object() : Cela définit un schéma pour un objet. L'objet ici représente un utilisateur avec trois propriétés :
name : Une chaîne de caractères (z.string()) avec une longueur minimale de 2 caractères (min(2)).
age : Un nombre (z.number()) avec une valeur minimale de 1 (min(1)).
email : Une chaîne de caractères qui doit être un email valide (z.string().email()).
 */
const userSchema = z.object({
  name: z.string().min(2),
  age: z.number().min(1),
  email: z.string().email(),
});

/** Middleware qui sera utilisé pour valider les données de la requête. */
export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const result = userSchema.safeParse(req.body); //La méthode safeParse() de Zod tente de valider req.body selon le schéma défini dans userSchema
  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }
  //Si la validation est réussie, le middleware appelle next(), ce qui permet à la requête de continuer vers le prochain middleware ou la route correspondante dans l'API
  next();
};
