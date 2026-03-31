"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealsService = void 0;
const meal_model_1 = require("../../../../../common/models/meal.model");
const crud_service_1 = require("../../../../../lib/services/crud.service");
class MealsService extends (0, crud_service_1.CrudService)(meal_model_1.Meal) {
}
exports.MealsService = MealsService;
//# sourceMappingURL=meals.service.js.map