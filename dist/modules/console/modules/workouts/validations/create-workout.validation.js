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
exports.createWorkoutSchema = void 0;
const joi = __importStar(require("joi"));
const create_schema_1 = require("../../../../../helpers/create-schema");
const fitness_goal_enum_1 = require("../../../../../common/enums/fitness-goal.enum");
const fitness_level_enum_1 = require("../../../../../common/enums/fitness-level.enum");
const place_enum_1 = require("../../../../../common/enums/place.enum");
exports.createWorkoutSchema = (0, create_schema_1.createSchema)({
    name: joi.string().empty().required().messages({
        "string.base": "please enter a valid name",
        "any.required": "name is required",
        "string.empty": "name can not be empty",
    }),
    description: joi.string().empty().required().messages({
        "string.base": "please enter a valid name",
        "any.required": "name is required",
        "string.empty": "name can not be empty",
    }),
    type: joi.string().empty().required().messages({
        "string.base": "please enter a valid type",
        "any.required": "type is required",
        "string.empty": "type can not be empty",
    }),
    created_by: joi.string().empty().required().messages({
        "string.base": "please enter a valid created_by",
        "any.required": "created_by is required",
        "string.empty": "created_by can not be empty",
    }),
    image: joi.string().empty().optional().messages({
        "string.base": "please enter a valid image url",
        "string.empty": "image url can not be empty",
    }),
    fitness_level: joi.string().valid(...Object.values(fitness_level_enum_1.FitnessLevel)).empty().required().messages({
        "string.base": "please enter a valid fitness level",
        "any.required": "fitness level is required",
        "string.empty": "fitness level can not be empty",
        "any.only": `Fitness level must be one of the following values: ${fitness_level_enum_1.FitnessLevel.ADVANCED}, ${fitness_level_enum_1.FitnessLevel.BEGINNER} or ${fitness_level_enum_1.FitnessLevel.INTERMEDIATE}`
    }),
    fitness_goal: joi.string().valid(...Object.values(fitness_goal_enum_1.FitnessGoal)).empty().required().messages({
        "string.base": "please enter a valid fitness goal",
        "any.required": "fitness goal is required",
        "string.empty": "fitness goal can not be empty",
        "any.only": `Fitness goal must be one of the following values: ${fitness_goal_enum_1.FitnessGoal.GAIN_MUSCLE}, ${fitness_goal_enum_1.FitnessGoal.GET_FITTER} or ${fitness_goal_enum_1.FitnessGoal.LOSE_WEIGHT}`
    }),
    place: joi.array().empty().required().items(joi.string().empty().required().valid(...Object.values(place_enum_1.Place)).messages({
        "string.base": "please enter a valid place",
        "any.required": "place is required",
        "string.empty": "place can not be empty",
        "any.only": `place must be one of the following values: ${place_enum_1.Place.GYM} or ${place_enum_1.Place.HOME}`
    })).messages({
        "array.base": "please enter a valid place array",
        "any.required": "place array is required",
        "array.empty": "place array can not be empty",
    }),
    min_per_day: joi.number().integer().empty().required().messages({
        "number.base": "please enter a valid min per day",
        "any.required": "min per day is required",
        "number.empty": "min per day can not be empty",
        "number.integer": "day number must be an integer",
    }),
    total_number_days: joi.number().integer().empty().required().messages({
        "number.base": "please enter a valid total number days",
        "any.required": "total number days is required",
        "number.empty": "total number days can not be empty",
        "number.integer": "day number must be an integer",
    }),
    template_weeks: joi.array().empty().required().items(joi.object({
        week_number: joi.number().integer().empty().required().messages({
            "number.base": "please enter a valid week number",
            "any.required": "week number is required",
            "number.empty": "week number can not be empty",
            "number.integer": "week number must be an integer",
        }),
        week_name: joi.string().empty().required().messages({
            "string.base": "please enter a valid week name",
            "any.required": "week name is required",
            "string.empty": "week name can not be empty",
        }),
        week_description: joi.string().empty().required().messages({
            "string.base": "please enter a valid week description",
            "any.required": "week description is required",
            "string.empty": "week description can not be empty",
        }),
        days: joi.array().required().items(joi.object({
            day_number: joi.number().empty().integer().min(1).max(7).required().messages({
                "number.base": "Please enter a valid day number",
                "any.required": "day number is required",
                "number.empty": "day number cannot be empty",
                "number.integer": "day number must be an integer",
                "number.min": "day number must be between 1 and 7",
                "number.max": "day number must be between 1 and 7"
            }),
            total_number_exercises: joi.number().empty().integer().required().messages({
                "number.base": "Please enter a valid total number exercises",
                "any.required": "total number exercises is required",
                "number.empty": "total number exercises cannot be empty",
                "number.integer": "total number exercises must be an integer",
            }),
            day_type: joi.string().empty().required().messages({
                "string.base": "please enter a valid day type",
                "any.required": "day type is required",
                "string.empty": "day type can not be empty",
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
        }).empty().messages({
            "object.base": "please enter a valid day object",
            "any.required": "day object is required",
            "object.empty": "day object can not be empty",
        })),
    }).empty().messages({
        "array.base": "please enter a valid days array",
        "any.required": "days array is required",
        "array.empty": "days array can not be empty",
    })).messages({
        "array.base": "please enter a valid templateWeeks",
        "any.required": "templateWeeks is required",
        "array.empty": "templateWeeks can not be empty",
    }),
});
//# sourceMappingURL=create-workout.validation.js.map