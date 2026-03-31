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
exports.ExercisesDoneEvent = void 0;
const activity_type_enum_1 = require("../../../../../common/enums/activity-type.enum");
const activity_model_1 = require("../../../../../common/models/activity.model");
const events_manager_1 = require("../../../../../lib/events/events-manager");
const mongoose_1 = require("mongoose");
class ExercisesDoneEvent {
    constructor(userId, exercisesIds) {
        this.userId = userId;
        this.exercisesIds = exercisesIds;
    }
}
exports.ExercisesDoneEvent = ExercisesDoneEvent;
events_manager_1.EventsManager.on(ExercisesDoneEvent.name, (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Exercise done event for user ${event.userId}`);
    yield Promise.all(event.exercisesIds.map(eId => {
        activity_model_1.Activity.create({
            user_id: new mongoose_1.Types.ObjectId(event.userId),
            related_id: new mongoose_1.Types.ObjectId(eId),
            activity_type: activity_type_enum_1.ActivityType.EXERCISE,
        }).catch(console.error);
    }));
}));
//# sourceMappingURL=exercises-done.event.js.map