"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
// Définition des options Swagger
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API LinkStudy",
            version: "1.0.0",
            description: "Documentation de l'API avec Swagger",
        },
        servers: [
            {
                url: "http://localhost:5000", // Mets le bon port si différent
            },
        ],
    },
    apis: ["./src/routes/*.ts"], // Assurez-vous que le chemin est correct
};
// Générer la documentation Swagger
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const setupSwagger = (app) => {
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    console.log("📄 Swagger disponible sur : http://localhost:5000/api-docs");
};
exports.setupSwagger = setupSwagger;
