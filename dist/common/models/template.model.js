"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const templateSchema = new Schema({
    name: { type: String, required: true },
    user: { type: mongoose_1.default.Types.ObjectId, ref: "users" },
    creationDate: { type: Date, default: Date.now() },
    exercises: [{ type: mongoose_1.default.Types.ObjectId, ref: "exercises" }],
});
exports.Template = mongoose_1.default.model("templates", templateSchema);
//# sourceMappingURL=template.model.js.map