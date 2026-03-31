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
exports.UserRegisteredWorkoutsService = void 0;
const user_registered_workout_model_1 = require("../../../../../common/models/user-registered-workout.model");
const crud_service_1 = require("../../../../../lib/services/crud.service");
const workout_model_1 = require("../../../../../common/models/workout.model");
class UserRegisteredWorkoutsService extends (0, crud_service_1.CrudService)(user_registered_workout_model_1.UserRegisteredWorkout, {
    defaultFilter: {
        is_active: true,
    },
}) {
    constructor() {
        super(...arguments);
        this.workoutsService = new ((0, crud_service_1.CrudService)(workout_model_1.Workout))();
    }
    unregisterCurrentWorkout(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.updateMany({
                user: userId,
                is_active: true,
            }, {
                is_active: false,
            }, false);
        });
    }
    createForUser(data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const workout = yield this.workoutsService.findOneOrFail({
                _id: data.workout,
            });
            yield this.unregisterCurrentWorkout(userId);
            return yield this.create(Object.assign(Object.assign({}, data), { user: userId, weeks: workout.template_weeks, is_active: true }));
        });
    }
}
exports.UserRegisteredWorkoutsService = UserRegisteredWorkoutsService;
//# sourceMappingURL=user-registered-workouts.service.js.map