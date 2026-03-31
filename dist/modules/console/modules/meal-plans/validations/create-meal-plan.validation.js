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
exports.CreateMealPlan = exports.CreateMealPlanKeys = void 0;
const joi = __importStar(require("joi"));
const create_schema_1 = require("../../../../../helpers/create-schema");
exports.CreateMealPlanKeys = {
    image: joi.string().empty().required().messages({
        "string.base": "please enter a valid image",
        "any.required": "image is required",
        "string.empty": "image can not be empty",
    }),
    description: joi.string().empty().required().messages({
        "string.base": "please enter a valid description",
        "any.required": "description is required",
        "string.empty": "description can not be empty",
    }),
    duration: joi.number().empty().required().messages({
        "number.base": "please enter a valid Duration",
        "any.required": "Duration is required",
        "number.empty": "Duration can not be empty",
    }),
    level: joi.string().empty().required().messages({
        "string.base": "please enter a valid Level",
        "any.required": "Level is required",
        "string.empty": "Level can not be empty",
    }),
    your_journey: joi.string().empty().required().messages({
        "string.base": "please enter a valid your_Journey",
        "any.required": "your_Journey is required",
        "string.empty": "your_Journey can not be empty",
    }),
    key_features: joi.array().required().items(joi.object({
        title: joi.string().empty().required().messages({
            "string.base": "please enter a valid title",
            "any.required": "title is required",
            "string.empty": "title can not be empty",
        }),
        description: joi.string().empty().required().messages({
            "string.base": "please enter a valid description",
            "any.required": "description is required",
            "string.empty": "description can not be empty",
        }),
    }).required().empty().messages({
        "any.required": "key_Features is required",
        "object.empty": "key_Features can not be empty",
    })).messages({
        "array.base": "please enter a valid key_Features",
        "any.required": "key_Features is required",
        "array.empty": "key_Features can not be empty",
    }),
    days: joi.array().required().items(joi.object({
        day_number: joi.number().empty().required().messages({
            "number.base": "please enter a valid day_number",
            "any.required": "day_number is required",
            "number.empty": "day_number can not be empty",
        }),
        meals: joi.array().items(joi.string().empty().required().messages({
            "string.base": "please enter a valid meals",
            "any.required": "meals is required",
            "string.empty": "meals can not be empty",
        })),
    }).required().messages({
        "any.required": "days is required",
        "object.empty": "days can not be empty",
    })).messages({
        "array.base": "please enter a valid days",
        "any.required": "days is required",
        "array.empty": "days can not be empty",
    }),
};
exports.CreateMealPlan = (0, create_schema_1.createSchema)(exports.CreateMealPlanKeys);
//# sourceMappingURL=create-meal-plan.validation.js.map