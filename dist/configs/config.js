"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const env_1 = require("../lib/env/env");
dotenv_1.default.config();
exports.config = {
    port: env_1.Env.get("PORT", 7860).toNumber(),
    swaggerServer: env_1.Env.getOptional('SWAGGER_SERVER').toString(),
    host: env_1.Env.get("HOST", "http://localhost").toString(),
    db: {
        uri: env_1.Env.get("DB_URI").toString(),
    },
    jwt: {
        secret: env_1.Env.get("JWT_SECRET").toString(),
        expiresIn: env_1.Env.get("JWT_EXPIRES_IN").toString(),
    },
    saltRounds: env_1.Env.get("SALT_ROUNDS", 5).toNumber(),
    modelsServerUrl: env_1.Env.get("MODELS_SERVER_URL").toString(),
};
//# sourceMappingURL=config.js.map