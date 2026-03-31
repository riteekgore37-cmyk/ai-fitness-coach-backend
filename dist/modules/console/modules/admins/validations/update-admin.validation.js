"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAdminSchema = void 0;
const role_enum_1 = require("../../../../../common/enums/role.enum");
const joi = __importStar(require("joi"));
const create_schema_1 = require("../../../../../helpers/create-schema");
exports.updateAdminSchema = (0, create_schema_1.createSchema)({
    name: joi.string().empty().optional().messages({
        "string.base": "please enter a valid name",
        "string.empty": "name can not be empty",
    }),
    email: joi
        .string()
        .required()
        .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "org", "eg", "io"] },
    })
        .empty()
        .messages({
        "string.email": "please enter a valid email",
        "any.required": "email must be entered",
        "string.empty": "email can not be empty",
    }),
    password: joi.string().empty().min(8).optional().messages({
        "string.base": "please enter a valid password",
        "string.empty": "password cannot be empty",
        "string.min": "password must be at least 8 characters",
    }),
    image: joi.string().empty().optional().messages({
        "string.base": "please enter a valid image",
        "string.empty": "image cannot be empty",
    }),
    role: joi
        .string()
        .valid(...Object.values(role_enum_1.Role))
        .optional()
        .messages({
        "string.base": "please enter a valid role",
        "string.empty": "role cannot be empty",
    }),
    gender: joi.string().empty().optional().messages({
        "string.base": "please enter a valid gender",
        "string.empty": "gender cannot be empty",
    }),
});
//# sourceMappingURL=update-admin.validation.js.map