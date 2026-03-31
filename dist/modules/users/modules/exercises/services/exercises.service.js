"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExerciseService = void 0;
const exercise_type_enum_1 = require("../../../../../common/enums/exercise-type.enum");
const exercise_model_1 = require("../../../../../common/models/exercise.model");
const crud_service_1 = require("../../../../../lib/services/crud.service");
const caloriesPerMinute = 5;
const caloriesPerRep = 0.5;
class ExerciseService extends (0, crud_service_1.CrudService)(exercise_model_1.Exercise) {
    calculateCalories(exercise) {
        if (exercise.isDeleted) {
            return 0;
        }
        let calories = 0;
        switch (exercise.exerciseType) {
            case exercise_type_enum_1.ExerciseType.DURATION:
                if (exercise.duration) {
                    calories = exercise.duration * caloriesPerMinute;
                }
                break;
            case exercise_type_enum_1.ExerciseType.WEIGHT:
                if (exercise.reps && exercise.sets) {
                    calories = exercise.reps * exercise.sets * caloriesPerRep;
                }
                break;
            default:
                throw new Error(`Unknown exercise type: ${exercise.exerciseType}`);
        }
        return calories;
    }
}
exports.ExerciseService = ExerciseService;
//# sourceMappingURL=exercises.service.js.map