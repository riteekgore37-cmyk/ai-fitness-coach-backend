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
exports.WorkoutsProgressService = void 0;
const user_registered_workout_model_1 = require("../../../../../common/models/user-registered-workout.model");
const crud_service_1 = require("../../../../../lib/services/crud.service");
const http_error_1 = require("../../../../../lib/error-handling/http-error");
const workouts_service_1 = require("../../workouts/services/workouts.service");
const events_manager_1 = require("../../../../../lib/events/events-manager");
const exercises_done_event_1 = require("../../exercises/events/exercises-done.event");
class WorkoutsProgressService extends (0, crud_service_1.CrudService)(user_registered_workout_model_1.UserRegisteredWorkout, {
    defaultFilter: {
        is_active: true,
    },
}) {
    constructor() {
        super(...arguments);
        this.workoutsService = new workouts_service_1.WorkoutService();
    }
    updateForUser(workoutProps, _data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // find workout
            const workout = yield this.findOneOrFail({
                _id: workoutProps.urwId,
                user: userId,
            });
            // find week
            const week = workout.weeks.find(w => w.week_number === workoutProps.weekNumber);
            if (!week)
                throw new http_error_1.HttpError(404, 'Workout Week Not Found');
            const weekIndex = workout.weeks.indexOf(week);
            // find day
            const day = week.days.find(d => d.day_number === workoutProps.dayNumber);
            if (!day)
                throw new http_error_1.HttpError(404, 'Workout Day Not Found');
            const dayIndex = week.days.indexOf(day);
            // update day and week
            day.is_done = true;
            week.days[dayIndex] = day;
            week.is_done = week.days.every(d => d.is_done);
            workout.weeks[weekIndex] = week;
            // if last week
            if (weekIndex === workout.weeks.length - 1) {
                yield this.workoutsService.createModelWorkout(userId);
            }
            events_manager_1.EventsManager.emit(exercises_done_event_1.ExercisesDoneEvent.name, new exercises_done_event_1.ExercisesDoneEvent(userId, day.exercises.map(e => e.toString())));
            // save changes
            workout.markModified('weeks');
            return workout.save();
        });
    }
}
exports.WorkoutsProgressService = WorkoutsProgressService;
//# sourceMappingURL=workouts-progress.service.js.map