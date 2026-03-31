"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Env = exports.EnvValue = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class EnvValue {
    constructor(value) {
        this.value = value;
    }
    toString() {
        return String(this.value);
    }
    toNumber() {
        return Number(this.value);
    }
    toBoolean() {
        return this.value === "true";
    }
}
exports.EnvValue = EnvValue;
class Env {
    static get(key, defaultValue) {
        const value = process.env[key] || defaultValue;
        if (!value) {
            throw new Error(`Environment variable ${key} not found`);
        }
        return new EnvValue(value);
    }
    static getOptional(key, defaultValue) {
        const value = process.env[key] || defaultValue;
        if (!value) {
            return new EnvValue("");
        }
        return new EnvValue(value);
    }
}
exports.Env = Env;
//# sourceMappingURL=env.js.map