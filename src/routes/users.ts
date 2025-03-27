import { Router } from "express";
import { getUsers, createUser, updateUser, deleteUser, loginUser} from "../controllers/users";
import { authenticate } from "../middleware/auth";
import { validateUser } from "../middleware/validation";

const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: Récupérer tous les utilisateurs
 *     description: Retourne une liste de tous les utilisateurs
 *     responses:
 *       200:
 *         description: Succès - Retourne la liste des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   forname:
 *                     type: string
 *                   email:
 *                     type: string
 *                   pseudo:
 *                     type: string
 *                   date_of_birth:
 *                     type: string
 *                     format: date
 */
router.get("/", getUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [Users]
 *     summary: Ajouter un utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               forname:
 *                 type: string
 *               pseudo:
 *                 type: string
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Utilisateur ajouté avec succès
 *       400:
 *         description: Requête invalide - informations manquantes ou incorrectes
 */
router.post("/", createUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags: [Users]
 *     summary: Connecter un utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "Password123!"
 *     responses:
 *       200:
 *         description: Connexion réussie, retourne un token JWT
 *       401:
 *         description: Email ou mot de passe incorrect
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /users/{email}:
 *   put:
 *     tags: [Users]
 *     summary: Modifier un utilisateur
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               forname:
 *                 type: string
 *               pseudo:
 *                 type: string
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Utilisateur modifié avec succès
 *       400:
 *         description: Requête invalide - informations manquantes ou incorrectes
 *       404:
 *         description: Utilisateur non trouvé
 */
router.put("/:email", authenticate, updateUser);

/**
 * @swagger
 * /users/{email}:
 *   delete:
 *     tags: [Users]
 *     summary: Supprimer un utilisateur
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *       404:
 *         description: Utilisateur non trouvé
 */
router.delete("/:email", deleteUser);

export default router;

