"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const seeder_wrapper_1 = require("../../seeder/helpers/seeder-wrapper");
const meal_model_1 = require("../../common/models/meal.model");
const db_store_1 = require("../../seeder/helpers/db-store");
const ingredient_model_1 = require("../../common/models/ingredient.model");
exports.default = (0, seeder_wrapper_1.seederWrapper)(meal_model_1.Meal, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('fetching ingredients ids...');
    const ingredientsIds = yield Promise.all(db_store_1.dbStore.ingredientsNames.map((name) => __awaiter(void 0, void 0, void 0, function* () {
        const ing = yield ingredient_model_1.Ingredient.findOne(({ name }));
        return {
            name,
            _id: ing._id
        };
    })));
    console.log('preping meals data...');
    const data = yield Promise.all(db_store_1.dbStore.mealsDataset.map((mealJson) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        return ({
            name: mealJson.Name,
            created_at: new Date(),
            image: mealJson.Images[0],
            ingredients: mealJson.RecipeIngredientParts.map(name => ingredientsIds.find(i => i.name === name)._id),
            calories: mealJson.Calories,
            carbs: mealJson.CarbohydrateContent,
            proteins: mealJson.ProteinContent,
            fats: mealJson.FatContent,
            type: (_a = mealJson.Category) === null || _a === void 0 ? void 0 : _a.toLowerCase(),
            isDeleted: false,
        });
    })));
    console.log('inserting meals...');
    yield meal_model_1.Meal.insertMany(data);
}));
//# sourceMappingURL=009-meals.seeder.js.map