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
exports.db = void 0;
exports.connectDB = connectDB;
const node_postgres_1 = require("drizzle-orm/node-postgres");
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Création du client PostgreSQL
const client = new pg_1.Client({
    connectionString: process.env.DATABASE_URL,
});
// Connexion Drizzle
exports.db = (0, node_postgres_1.drizzle)(client);
// Fonction pour se connecter à PostgreSQL
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("✅ Connexion PostgreSQL réussie !");
        }
        catch (error) {
            console.error("❌ Erreur de connexion à PostgreSQL :", error);
            process.exit(1); // Arrête le serveur en cas d'erreur
        }
    });
}
