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
exports.updateUserSchema = void 0;
const joi = __importStar(require("joi"));
const create_schema_1 = require("../../../../../helpers/create-schema");
exports.updateUserSchema = (0, create_schema_1.createSchema)({
    name: joi.string().empty().optional().messages({
        "string.base": "please enter a valid name",
        "string.empty": "name can not be empty",
    }),
    email: joi.string().optional().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "org", "eg", "io"] },
    }).empty().messages({
        "string.email": "please enter a valid email",
        "string.empty": "email can not be empty",
    }),
    gender: joi.string().empty().optional().messages({
        "string.base": "please enter a valid gender",
        "string.empty": "gender can not be empty",
    }),
    height: joi.number().optional().messages({
        "number.base": "please enter a valid height",
        "number.empty": "height can not be empty"
    }),
    weight: joi.number().optional().messages({
        "number.base": "please enter a valid weight",
        "number.empty": "weight can not be empty"
    }),
    fitness_level: joi.string().empty().optional().messages({
        "string.base": "please enter a valid fitness_level",
        "string.empty": "fitness_level can not be empty"
    }),
    preferences: joi.object().keys({
        fitness_goal: joi.string().empty().optional().messages({
            "string.base": "please enter a valid fitness goal",
            "string.empty": "fitness goal can not be empty"
        }),
        target_weight: joi.number().optional().messages({
            "number.base": "please enter a valid target weight",
            "number.empty": "target weight can not be empty"
        }),
        workout_frequency: joi.number().optional().messages({
            "number.base": "please enter a valid workout frequency",
            "number.empty": "workout frequency can not be empty"
        }),
        preferred_days: joi.array().items(joi.string()).optional().messages({
            "array.base": "please enter a valid preferred day",
            "array.empty": "preferred day can not be empty"
        }),
        workout_place: joi.string().empty().optional().messages({
            "string.base": "please enter a valid workout place",
            "string.empty": "workout place can not be empty"
        }),
        preferred_equipment: joi.array().items(joi.string()).optional().messages({
            "array.base": "please enter a valid preferred equipment",
            "array.empty": "preferred equipment can not be empty"
        }),
    }),
    injuries: joi.array().items(joi.string()).optional().messages({
        "array.base": "please enter a valid injury",
        "array.empty": "injuries can not be empty"
    }),
    dob: joi.date().optional().messages({
        "date.base": "please enter a valid date of birth",
        "date.empty": "date of birth can not be empty"
    }),
});
//# sourceMappingURL=update.validation.js.map