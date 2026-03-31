"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExercisesService = void 0;
const exercise_model_1 = require("../../../../../common/models/exercise.model");
const crud_service_1 = require("../../../../../lib/services/crud.service");
class ExercisesService extends (0, crud_service_1.CrudService)(exercise_model_1.Exercise) {
}
exports.ExercisesService = ExercisesService;
//# sourceMappingURL=exercises.service.js.map