"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientsService = void 0;
const ingredient_model_1 = require("../../../../../common/models/ingredient.model");
const crud_service_1 = require("../../../../../lib/services/crud.service");
class IngredientsService extends (0, crud_service_1.CrudService)(ingredient_model_1.Ingredient) {
}
exports.IngredientsService = IngredientsService;
//# sourceMappingURL=ingredients.service.js.map