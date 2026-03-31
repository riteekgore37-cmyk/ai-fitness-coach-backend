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
exports.userRegisterSchema = exports.userRegisterKeys = void 0;
const authenticatable_type_enum_1 = require("../enums/authenticatable-type.enum");
const fitness_goal_enum_1 = require("../enums/fitness-goal.enum");
const fitness_level_enum_1 = require("../enums/fitness-level.enum");
const gender_enum_1 = require("../enums/gender.enum");
const injury_enum_1 = require("../enums/injury.enum");
const preferred_day_enum_1 = require("../enums/preferred-day.enum");
const preferred_equipment_enum_1 = require("../enums/preferred-equipment.enum");
const workout_place_enum_1 = require("../enums/workout-place.enum");
const joi = __importStar(require("joi"));
const create_schema_1 = require("../../helpers/create-schema");
exports.userRegisterKeys = {
    name: joi.string().empty().required().messages({
        "string.base": "please enter a valid name",
        "any.required": "name is required",
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
    password: joi.string().empty().min(8).required().messages({
        "string.base": "please enter a valid password",
        "any.required": "password must be entered",
        "string.empty": "password cannot be empty",
        "string.min": "password must be at least 8 characters",
    }),
    confirmPassword: joi.string().empty().min(8).required().messages({
        "string.base": "please enter a valid password",
        "any.required": "password must be entered",
        "string.empty": "password cannot be empty",
        "string.min": "password must be at least 8 characters",
    }),
    image: joi
        .object()
        .optional()
        .keys({
        url: joi.string().optional().messages({
            "string.base": "please enter a valid url",
        }),
        public_id: joi.string().optional().messages({
            "string.base": "please enter a valid public_id",
        }),
    }),
    gender: joi
        .string()
        .valid(...Object.values(gender_enum_1.Gender))
        .empty()
        .required()
        .messages({
        "string.base": "please enter a valid gender",
        "any.required": "gender must be entered",
        "string.empty": "gender cannot be empty",
    }),
    height: joi.number().empty().required().messages({
        "number.base": "please enter a valid height number",
        "any.required": "height must be entered",
        "number.empty": "height cannot be empty",
    }),
    weight: joi.number().empty().required().messages({
        "number.base": "please enter a valid weight number",
        "any.required": "weight must be entered",
        "number.empty": "weight cannot be empty",
    }),
    fitness_level: joi
        .string()
        .valid(...Object.values(fitness_level_enum_1.FitnessLevel))
        .empty()
        .required()
        .messages({
        "string.base": "please enter a valid fitness_level",
        "any.required": "fitness_level must be entered",
        "string.empty": "fitness_level cannot be empty",
    }),
    preferences: joi
        .object()
        .optional()
        .keys({
        fitness_goal: joi
            .string()
            .valid(...Object.values(fitness_goal_enum_1.FitnessGoal))
            .empty()
            .required()
            .messages({
            "string.base": "please enter a valid fitness_goal",
            "any.required": "fitness_goal must be entered",
            "string.empty": "fitness_goal cannot be empty",
        }),
        target_weight: joi.number().empty().required().messages({
            "number.base": "please enter a valid target_weight number",
            "any.required": "target_weight must be entered",
            "number.empty": "target_weight cannot be empty",
        }),
        workout_frequency: joi.number().empty().optional().messages({
            "number.base": "please enter a valid workout_frequency number",
            "number.empty": "workout_frequency cannot be empty",
        }),
        preferred_days: joi
            .array()
            .empty()
            .optional()
            .items(joi.string().valid(...Object.values(preferred_day_enum_1.PreferredDay))
            .empty().required().messages({
            "string.base": "please enter a valid preferred_days",
            "any.required": "preferred_days must be entered",
            "string.empty": "preferred_days cannot be empty",
        })),
        workout_place: joi
            .string()
            .valid(...Object.values(workout_place_enum_1.WorkoutPlace))
            .empty()
            .required()
            .messages({
            "string.base": "please enter a valid workout_place",
            "any.required": "workout_place must be entered",
            "string.empty": "workout_place cannot be empty",
        }),
        preferred_equipment: joi
            .array()
            .empty()
            .required()
            .items(joi.string().valid(...Object.values(preferred_equipment_enum_1.PreferredEquipment))
            .empty().required().messages({
            "string.base": "please enter a valid preferred_equipment",
            "any.required": "preferred_equipment must be entered",
            "string.empty": "preferred_equipment cannot be empty",
        })),
    }),
    injuries: joi
        .array()
        .empty()
        .required()
        .items(joi.string().valid(...Object.values(injury_enum_1.Injury))
        .empty().optional().messages({
        "string.base": "please enter a valid injuries",
        "any.required": "injuries must be entered",
        "string.empty": "injuries cannot be empty",
    })),
    dob: joi.date().empty().optional().messages({
        "date.base": "please enter a valid date",
    }),
    role: joi
        .string()
        .valid(...Object.values(authenticatable_type_enum_1.AuthenticatableType))
        .optional()
        .messages({
        "string.base": "please enter a valid role",
        "string.empty": "role cannot be empty",
    }),
};
exports.userRegisterSchema = (0, create_schema_1.createSchema)(exports.userRegisterKeys);
//# sourceMappingURL=user-register.validation.js.map