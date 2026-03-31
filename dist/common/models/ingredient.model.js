"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ingredient = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const ingredientSchema = new Schema({
    name: { type: String, required: true, unique: true, dropDups: true },
    serving_size: { type: Number, required: true },
    servings_count: { type: Number, required: true },
    serving_size_unit: { type: String, required: true },
    servings_count_unit: { type: String, required: true },
    calories: { type: Number, required: true },
    carbs: { type: Number, required: true },
    proteins: { type: Number, required: true },
    fats: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
});
exports.Ingredient = mongoose_1.default.model("ingredients", ingredientSchema);
//# sourceMappingURL=ingredient.model.js.map