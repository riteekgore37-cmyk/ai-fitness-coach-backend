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
exports.MealsDoneEvent = void 0;
const activity_type_enum_1 = require("../../../../../common/enums/activity-type.enum");
const activity_model_1 = require("../../../../../common/models/activity.model");
const events_manager_1 = require("../../../../../lib/events/events-manager");
const mongoose_1 = require("mongoose");
class MealsDoneEvent {
    constructor(userId, mealsIds) {
        this.userId = userId;
        this.mealsIds = mealsIds;
    }
}
exports.MealsDoneEvent = MealsDoneEvent;
events_manager_1.EventsManager.on(MealsDoneEvent.name, (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Meal done event for user ${event.userId}`);
    yield Promise.all(event.mealsIds.map(mId => {
        activity_model_1.Activity.create({
            user_id: new mongoose_1.Types.ObjectId(event.userId),
            related_id: new mongoose_1.Types.ObjectId(mId),
            activity_type: activity_type_enum_1.ActivityType.MEAL,
        }).catch(console.error);
    }));
}));
//# sourceMappingURL=meals-done.event.js.map