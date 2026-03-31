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
exports.UpdateUserRegisteredMealPlan = exports.UpdateUserRegisteredMealPlanKeys = void 0;
const joi = __importStar(require("joi"));
const create_schema_1 = require("../../../../../helpers/create-schema");
exports.UpdateUserRegisteredMealPlanKeys = {
    user: joi.string().empty().optional().messages({
        "string.base": "please enter a valid user",
        "string.empty": "user can not be empty",
    }),
    isActive: joi.boolean().empty().optional().messages({
        "boolean.base": "please enter a valid isActive",
        "boolean.empty": "isActive can not be empty",
    }),
    meal_plan: joi.string().empty().optional().messages({
        "string.base": "please enter a valid meal_plan",
        "string.empty": "meal_plan can not be empty",
    }),
    days: joi.array().optional().items(joi.object({
        day_number: joi.number().empty().optional().messages({
            "number.base": "please enter a valid day_number",
            "number.empty": "day_number can not be empty",
        }),
        meals: joi.array().items(joi.string().empty().optional().messages({
            "string.base": "please enter a valid meals",
            "string.empty": "meals can not be empty",
        })),
        is_eaten: joi.boolean().empty().optional().messages({
            "boolean.base": "please enter a valid is_eaten",
            "boolean.empty": "is_eaten can not be empty",
        }),
    }).optional().empty().messages({
        "object.empty": "days can not be empty",
    })).messages({
        "array.base": "please enter a valid days",
        "array.empty": "days can not be empty",
    }),
};
exports.UpdateUserRegisteredMealPlan = (0, create_schema_1.createSchema)(exports.UpdateUserRegisteredMealPlanKeys);
//# sourceMappingURL=update-user-registered-meal-plan.validation.js.map