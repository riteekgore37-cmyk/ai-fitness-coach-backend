"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealPlan = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const fitness_level_enum_1 = require("../enums/fitness-level.enum");
const mealPlanSchema = new Schema({
    image: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    level: { type: String, enum: fitness_level_enum_1.FitnessLevel, required: true },
    your_journey: { type: String, required: false },
    createdAt: { type: Date, default: Date.now, required: false },
    key_features: [{
            title: { type: String, required: false },
            description: { type: String, required: false },
        }],
    days: [
        {
            day_number: { type: Number, required: true, },
            meals: [
                { type: mongoose_1.default.Types.ObjectId, ref: "meals" },
            ],
        },
    ],
    aiGenerated: { type: Boolean, required: true, default: false },
    isDeleted: { type: Boolean, default: false },
});
exports.MealPlan = mongoose_1.default.model("mealPlans", mealPlanSchema);
//# sourceMappingURL=meal-plan.model.js.map