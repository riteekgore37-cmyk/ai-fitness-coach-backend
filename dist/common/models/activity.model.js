"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const activity_type_enum_1 = require("../enums/activity-type.enum");
const { Schema } = mongoose_1.default;
const activitySchema = new Schema({
    related_item: {
        type: Schema.Types.Mixed,
        required: false,
    },
    meta_data: {
        type: Schema.Types.Mixed,
        default: {},
    },
    activity_type: {
        type: String,
        enum: Object.values(activity_type_enum_1.ActivityType),
    },
    related_id: {
        type: Schema.Types.ObjectId,
        required: false,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});
exports.Activity = mongoose_1.default.model("activities", activitySchema);
//# sourceMappingURL=activity.model.js.map