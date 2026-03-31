"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegisteredWorkout = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const userRegisteredWorkoutSchema = new Schema({
    user: { type: mongoose_1.default.Types.ObjectId, ref: "users" },
    workout: { type: mongoose_1.default.Types.ObjectId, ref: "workouts" },
    is_active: { type: Boolean, default: false },
    weeks: [
        {
            week_number: { type: Number },
            week_name: { type: String, required: true, },
            week_description: { type: String, required: true, },
            is_done: { type: Boolean, default: false },
            days: [
                {
                    day_number: { type: Number, required: true, },
                    total_number_exercises: { type: Number, required: true, },
                    day_type: { type: String, required: true, },
                    exercises: [
                        { type: mongoose_1.default.Types.ObjectId, ref: "exercises" },
                    ],
                    is_done: { type: Boolean, default: false }
                },
            ],
        },
    ]
});
exports.UserRegisteredWorkout = mongoose_1.default.model("UserRegisteredWorkouts", userRegisteredWorkoutSchema);
//# sourceMappingURL=user-registered-workout.model.js.map