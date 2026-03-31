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
exports.createExerciseSchema = void 0;
const joi = __importStar(require("joi"));
const create_schema_1 = require("../../../../../helpers/create-schema");
exports.createExerciseSchema = (0, create_schema_1.createSchema)({
    name: joi.string().empty().required().messages({
        "string.base": "please enter a valid name",
        "any.required": "name is required",
        "string.empty": "name can not be empty",
    }),
    category: joi.string().empty().required().messages({
        "string.base": "please enter a valid category",
        "any.required": "category is required",
        "string.empty": "category can not be empty",
    }),
    duration: joi.number().empty().optional().messages({
        "number.base": "please enter a valid duration",
    }),
    expectedDurationRange: joi.object().keys({
        min: joi.number().required().messages({
            "number.base": "please enter a valid min duration",
            "any.required": "min duration is required",
        }),
        max: joi.number().required().messages({
            "number.base": "please enter a valid max duration",
            "any.required": "max duration is required",
        }),
    }),
    reps: joi.number().empty().required().messages({
        "number.base": "please enter a valid reps",
        "any.required": "reps is required",
    }),
    sets: joi.number().empty().required().messages({
        "number.base": "please enter a valid sets",
        "any.required": "sets is required",
    }),
    instructions: joi.string().empty().required().messages({
        "string.base": "please enter a valid instructions",
        "any.required": "instructions is required",
        "string.empty": "instructions can not be empty",
    }),
    benefits: joi.string().empty().required().messages({
        "string.base": "please enter a valid benefits",
        "any.required": "benefits is required",
        "string.empty": "benefits can not be empty",
    }),
    targetMuscles: joi.object().keys({
        primary: joi.string().empty().required().messages({
            "string.base": "please enter a valid primary target muscle",
            "any.required": "primary target muscle is required",
            "string.empty": "primary target muscle can not be empty",
        }),
        secondary: joi.string().empty().required().messages({
            "string.base": "please enter a valid secondary target muscle",
            "any.required": "secondary target muscle is required",
            "string.empty": "secondary target muscle can not be empty",
        }),
    }),
    equipments: joi.array().items(joi.string()).empty().required().messages({
        "array.base": "please enter a valid equipments",
        "any.required": "equipments is required",
    }),
    coverImage: joi.string().empty().required().messages({
        "string.base": "please enter a valid cover image",
        "any.required": "cover image is required",
        "string.empty": "cover image can not be empty",
    }),
    media: joi.object().keys({
        type: joi.string().valid("image", "video").required().messages({
            "string.base": "please enter a valid media type",
            "any.required": "media type is required",
        }),
        url: joi.string().empty().required().messages({
            "string.base": "please enter a valid media url",
            "any.required": "media url is required",
            "string.empty": "media url can not be empty",
        }),
    }),
});
//# sourceMappingURL=create-excercise.validation.js.map