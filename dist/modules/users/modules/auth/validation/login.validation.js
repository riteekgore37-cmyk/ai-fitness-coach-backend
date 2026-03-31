"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidationSchema = exports.loginValidationKeys = void 0;
const joi_1 = __importDefault(require("joi"));
const create_schema_1 = require("../../../../../helpers/create-schema");
exports.loginValidationKeys = {
    email: joi_1.default
        .string()
        .required()
        .empty()
        .messages({
        "any.required": "email must be entered",
        "string.empty": "email can not be empty",
    }),
    password: joi_1.default.string().empty().required().messages({
        "string.base": "please enter a valid password",
        "any.required": "password must be entered",
        "string.empty": "password cannot be empty",
    }),
};
exports.loginValidationSchema = (0, create_schema_1.createSchema)(exports.loginValidationKeys);
//# sourceMappingURL=login.validation.js.map