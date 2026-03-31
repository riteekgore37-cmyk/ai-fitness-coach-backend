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
exports.createTemplatesSchema = void 0;
const joi = __importStar(require("joi"));
const create_schema_1 = require("../../../../../helpers/create-schema");
exports.createTemplatesSchema = (0, create_schema_1.createSchema)({
    name: joi.string().empty().required().messages({
        "string.base": "please enter a valid name",
        "any.required": "name is required",
        "string.empty": "name can not be empty",
    }),
    user: joi.string().empty().required().messages({
        "string.base": "please enter a valid user id",
        "any.required": "user id is required",
        "string.empty": "user id can not be empty",
    }),
    creationDate: joi.date().optional().messages({
        "date.base": "please enter a valid creation date",
    }),
    exercises: joi.array().empty().required().items(joi.string().empty().required().messages({
        "string.base": "please enter a valid exercise id",
        "any.required": "exercise id is required",
        "string.empty": "exercise id can not be empty",
    })).messages({
        "array.base": "please enter a valid exercises array",
        "any.required": "exercises array is required",
        "array.empty": "exercises array can not be empty",
    }),
});
//# sourceMappingURL=create-templates.validation.js.map