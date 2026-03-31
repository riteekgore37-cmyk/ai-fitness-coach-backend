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
const db_store_1 = require("../../seeder/helpers/db-store");
const ingredient_model_1 = require("../../common/models/ingredient.model");
const faker_1 = require("@faker-js/faker");
exports.default = (0, seeder_wrapper_1.seederWrapper)(ingredient_model_1.Ingredient, () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Promise.all(db_store_1.dbStore.ingredientsNames.map((ingredientName) => __awaiter(void 0, void 0, void 0, function* () {
        return ({
            name: ingredientName,
            serving_size: faker_1.faker.number.int({ min: 5, max: 20 }),
            servings_count: faker_1.faker.number.int({ min: 1, max: 5 }),
            serving_size_unit: "Grams",
            servings_count_unit: "servings",
            calories: faker_1.faker.number.int({ min: 10, max: 20 }),
            carbs: faker_1.faker.number.int({ min: 10, max: 20 }),
            proteins: faker_1.faker.number.int({ min: 10, max: 20 }),
            fats: faker_1.faker.number.int({ min: 10, max: 20 }),
            isDeleted: false,
        });
    })));
    yield ingredient_model_1.Ingredient.insertMany(data);
}));
//# sourceMappingURL=008-ingredients.seeder.js.map