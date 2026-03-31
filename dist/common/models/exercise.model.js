"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exercise = void 0;
const exercise_type_enum_1 = require("../enums/exercise-type.enum");
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const exerciseSchema = new Schema({
    name: { type: String, required: true, unique: true, dropDups: true },
    category: { type: String, required: true },
    duration: { type: Number, required: false, default: 0 },
    exerciseType: {
        type: String,
        required: false,
        enum: exercise_type_enum_1.ExerciseType
    },
    expectedDurationRange: {
        min: { type: Number, required: true },
        max: { type: Number, required: true },
    },
    reps: { type: Number, required: false },
    sets: { type: Number, required: false },
    instructions: { type: String, required: true },
    benefits: { type: String, required: true },
    targetMuscles: {
        primary: { type: Schema.Types.ObjectId, ref: "muscles" },
        secondary: { type: Schema.Types.ObjectId, ref: "muscles" },
    },
    equipments: [{ type: Schema.Types.ObjectId, ref: "equipments" }],
    coverImage: { type: String, required: true },
    media: {
        type: {
            type: String,
            enum: ["image", "video"],
            required: true,
        },
        url: { type: String, required: true },
    },
    isDeleted: { type: Boolean, default: false },
});
exports.Exercise = mongoose_1.default.model("exercises", exerciseSchema);
//# sourceMappingURL=exercise.model.js.map