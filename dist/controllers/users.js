"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = void 0;
const index_1 = require("../db/index");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const logger_1 = __importDefault(require("../utils/logger"));
// Récupérer tous les utilisateurs
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield index_1.db.select().from(schema_1.usersTable);
        res.json(users);
    }
    catch (error) {
        logger_1.default.error("Erreur lors de la récupération des utilisateurs", error);
        res.status(500).json({ error: "Erreur serveur." });
    }
});
exports.getUsers = getUsers;
// Ajouter un utilisateur
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, age, email } = req.body;
        yield index_1.db.insert(schema_1.usersTable).values({ name, age, email });
        res.json({ message: "User added!" });
    }
    catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout de l'utilisateur." });
    }
});
exports.createUser = createUser;
// Modifier un utilisateur
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { age } = req.body;
        yield index_1.db.update(schema_1.usersTable).set({ age }).where((0, drizzle_orm_1.eq)(schema_1.usersTable.email, req.params.email));
        res.json({ message: "User updated!" });
    }
    catch (error) {
        res.status(500).json({ error: "Erreur lors de la modification de l'utilisateur." });
    }
});
exports.updateUser = updateUser;
// Supprimer un utilisateur
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield index_1.db.delete(schema_1.usersTable).where((0, drizzle_orm_1.eq)(schema_1.usersTable.email, req.params.email));
        res.json({ message: "User deleted!" });
    }
    catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur." });
    }
});
exports.deleteUser = deleteUser;
