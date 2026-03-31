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
exports.createIngredientsSchema = void 0;
const joi = __importStar(require("joi"));
const create_schema_1 = require("../../../../../helpers/create-schema");
exports.createIngredientsSchema = (0, create_schema_1.createSchema)({
    name: joi.string().empty().required().messages({
        "string.base": "please enter a valid name",
        "any.required": "name is required",
        "string.empty": "name can not be empty",
    }),
    serving_size: joi.number().empty().required().messages({
        "number.base": "please enter a valid serving size",
        "any.required": "serving size is required",
        "number.empty": "serving size can not be empty",
    }),
    servings_count: joi.number().empty().required().messages({
        "number.base": "please enter a valid servings count",
        "any.required": "servings count is required",
        "number.empty": "servings count can not be empty",
    }),
    serving_size_unit: joi.string().empty().required().messages({
        "string.base": "please enter a valid serving size unit",
        "any.required": "serving size unit is required",
        "string.empty": "serving size unit can not be empty",
    }),
    servings_count_unit: joi.string().empty().required().messages({
        "string.base": "please enter a valid servings count unit",
        "any.required": "servings count unit is required",
        "string.empty": "servings count unit can not be empty",
    }),
    calories: joi.number().empty().required().messages({
        "number.base": "please enter a valid calories",
        "any.required": "calories is required",
        "number.empty": "calories can not be empty",
    }),
    carbs: joi.number().empty().required().messages({
        "number.base": "please enter a valid carbs",
        "any.required": "carbs is required",
        "number.empty": "carbs can not be empty",
    }),
    proteins: joi.number().empty().required().messages({
        "number.base": "please enter a valid proteins",
        "any.required": "proteins is required",
        "number.empty": "proteins can not be empty",
    }),
    fats: joi.number().empty().required().messages({
        "number.base": "please enter a valid fats",
        "any.required": "fats is required",
        "number.empty": "fats can not be empty",
    }),
});
//# sourceMappingURL=create-ingredient.validation.js.map