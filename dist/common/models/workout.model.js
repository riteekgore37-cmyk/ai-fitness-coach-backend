"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const fitness_goal_enum_1 = require("../enums/fitness-goal.enum");
const fitness_level_enum_1 = require("../enums/fitness-level.enum");
const place_enum_1 = require("../enums/place.enum");
const { Schema } = mongoose_1.default;
const workoutSchema = new Schema({
    name: { type: String, required: true, unique: true, dropDups: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    created_by: { type: mongoose_1.default.Types.ObjectId, ref: "admins" },
    image: { type: String },
    fitness_level: { type: String, enum: fitness_level_enum_1.FitnessLevel, required: true, },
    fitness_goal: { type: String, enum: fitness_goal_enum_1.FitnessGoal, required: true, },
    place: [{ type: String, enum: place_enum_1.Place, required: true, }],
    min_per_day: { type: Number, required: true, },
    total_number_days: { type: Number, required: true, },
    template_weeks: [
        {
            week_number: { type: Number, required: true, },
            week_name: { type: String, required: true, },
            week_description: { type: String, required: true, },
            days: [
                {
                    day_number: { type: Number, required: true, enum: [1, 2, 3, 4, 5, 6, 7] },
                    total_number_exercises: { type: Number, required: true, },
                    day_type: { type: String, required: true, },
                    exercises: [
                        { type: mongoose_1.default.Types.ObjectId, ref: "exercises" },
                    ],
                },
            ],
        },
    ],
    aiGenerated: { type: Boolean, required: true, default: false },
    isDeleted: { type: Boolean, default: false },
});
exports.Workout = mongoose_1.default.model("workouts", workoutSchema);
//# sourceMappingURL=workout.model.js.map