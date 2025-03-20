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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const index_1 = require("./db/index");
const errorHandler_1 = require("./middleware/errorHandler");
const swagger_1 = require("./utils/swagger");
const dotenv_1 = __importDefault(require("dotenv"));
// Charger les variables d'environnement
dotenv_1.default.config();
exports.app = (0, express_1.default)();
// Middleware pour parser le JSON
exports.app.use(express_1.default.json());
// Activer Swagger
(0, swagger_1.setupSwagger)(exports.app);
// Routes API
exports.app.use("/users", users_1.default);
exports.app.use(errorHandler_1.errorHandler);
// Démarrer le serveur
const PORT = process.env.PORT || 5000;
exports.app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, index_1.connectDB)();
    console.log(`Server started at http://localhost:${PORT}`);
    console.log(`📄 Swagger Docs: http://localhost:${PORT}/api-docs`);
}));
