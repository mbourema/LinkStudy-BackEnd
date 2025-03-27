import { Request, Response } from "express";
import { db } from "../db/index";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";
import logger from "../utils/logger";
import { hashPassword } from "../middleware/auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Récupérer tous les utilisateurs
export const getUsers = async (req: Request, res: Response) => {
    try {
      const users = await db.select().from(usersTable);
      res.json(users);
    } catch (error) {
      logger.error("Erreur lors de la récupération des utilisateurs", error);
      res.status(500).json({ error: "Erreur serveur." });
    }
  };

// Ajouter un utilisateur
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, forname, pseudo, date_of_birth } = req.body;

    // Hacher le mot de passe
    const hashedPassword = await hashPassword(password);

    await db.insert(usersTable).values({
      name,
      email,
      password: hashedPassword,
      forname,
      pseudo,
      date_of_birth
    });
    res.json({ message: "Utilisateur ajouté !" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'ajout de l'utilisateur.", details: error instanceof Error ? error.message : error });
  }
};

// Connecter un utilisateur
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);

    if (user.length === 0) {
      res.status(401).json({ error: "Email ou mot de passe incorrect" });
      return;
    }

    const foundUser = user[0];

    // Comparer le mot de passe avec le hash stocké
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      res.status(401).json({ error: "Email ou mot de passe incorrect" });
      return;
    }

    // Générer un token JWT
    const token = jwt.sign(
      { id: foundUser.id, email: foundUser.email, pseudo: foundUser.pseudo },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" } // Expiration dans 7 jours
    );

    res.json({ message: "Connexion réussie", token });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ error: "Erreur serveur.", details: error instanceof Error ? error.message : error});
  }
};

// Modifier un utilisateur
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, forname, pseudo, date_of_birth } = req.body;

    // Mise à jour de l'utilisateur en fonction de l'email
    await db.update(usersTable).set({
      name,
      forname,
      pseudo,
      date_of_birth
    }).where(eq(usersTable.email, req.params.email));

    res.json({ message: "Utilisateur mis à jour !" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la modification de l'utilisateur." });
  }
};

// Supprimer un utilisateur
export const deleteUser = async (req: Request, res: Response) => {
  try {
    await db.delete(usersTable).where(eq(usersTable.email, req.params.email));
    res.json({ message: "User deleted!" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur." });
  }
};
