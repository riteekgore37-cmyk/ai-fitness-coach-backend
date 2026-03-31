"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutService = void 0;
const workout_model_1 = require("../../../../../common/models/workout.model");
const crud_service_1 = require("../../../../../lib/services/crud.service");
class WorkoutService extends (0, crud_service_1.CrudService)(workout_model_1.Workout) {
}
exports.WorkoutService = WorkoutService;
;
//# sourceMappingURL=workouts.service.js.map