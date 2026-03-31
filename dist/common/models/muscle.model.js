"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Muscle = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const muscleSchema = new Schema({
    name: { type: String, required: true, unique: true, dropDups: true },
    image: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
});
exports.Muscle = mongoose_1.default.model("muscles", muscleSchema);
//# sourceMappingURL=muscle.model.js.map