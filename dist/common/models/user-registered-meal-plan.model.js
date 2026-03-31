"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegisteredMealPlan = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const userRegisteredMealPlanSchema = new Schema({
    user: { type: mongoose_1.default.Types.ObjectId, ref: "users" },
    isActive: { type: Boolean, default: true },
    meal_plan: { type: mongoose_1.default.Types.ObjectId, ref: "mealPlans" },
    createdAt: { type: Date, default: Date.now, required: false },
    days: [
        {
            day_number: { type: Number, required: true, },
            meals: [
                { type: mongoose_1.default.Types.ObjectId, ref: "meals" },
            ],
            is_eaten: { type: Boolean, default: false }
        },
    ],
});
exports.UserRegisteredMealPlan = mongoose_1.default.model("userRegisteredMealPlans", userRegisteredMealPlanSchema);
//# sourceMappingURL=user-registered-meal-plan.model.js.map