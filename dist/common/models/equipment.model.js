"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Equipment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const equipmentSchema = new Schema({
    name: { type: String, required: true, unique: true, dropDups: true },
    image: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
});
exports.Equipment = mongoose_1.default.model("equipments", equipmentSchema);
//# sourceMappingURL=equipment.model.js.map