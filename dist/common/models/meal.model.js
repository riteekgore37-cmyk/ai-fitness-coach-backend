"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Meal = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const meal_type_enum_1 = require("../enums/meal-type.enum");
const mealSchema = new Schema({
    name: { type: String, required: true, unique: true, dropDups: true },
    created_at: { type: Date, default: Date.now() },
    image: { type: String, required: true },
    type: {
        type: String,
        enum: meal_type_enum_1.MealType,
        required: true,
    },
    ingredients: [{ type: mongoose_1.default.Types.ObjectId, ref: "ingredients" }],
    calories: { type: Number, required: true },
    carbs: { type: Number, required: true },
    proteins: { type: Number, required: true },
    fats: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
});
exports.Meal = mongoose_1.default.model("meals", mealSchema);
//# sourceMappingURL=meal.model.js.map