import { Request, Response } from "express";
import { db } from "../db/index";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";
import logger from "../utils/logger";
import { hashPassword } from "../middleware/auth";

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
