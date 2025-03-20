"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const router = (0, express_1.Router)();
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
 */
router.get("/", users_1.getUsers);
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
 *               age:
 *                 type: integer
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur ajouté avec succès
 */
router.post("/", users_1.createUser);
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
 *               age:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Utilisateur modifié
 */
router.put("/:email", users_1.updateUser);
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
 *         description: Utilisateur supprimé
 */
router.delete("/:email", users_1.deleteUser);
exports.default = router;
