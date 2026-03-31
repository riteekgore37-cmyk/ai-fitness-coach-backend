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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const role_enum_1 = require("../../../../common/enums/role.enum");
const user_model_1 = require("../../../../common/models/user.model");
const { Schema } = mongoose_1.default;
const AdminSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, dropDups: true },
    password: { type: String, required: true },
    image: { type: String, default: {} },
    gender: { type: String, required: true },
    role: {
        type: String,
        enum: role_enum_1.Role
    },
});
AdminSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified("password")) {
            this.password = yield bcrypt_1.default.hash(this.password, user_model_1.saltrounds);
        }
        if (this.isModified("email")) {
            this.email = this.email.toLowerCase();
        }
        next();
    });
});
AdminSchema.pre(["updateOne", "findOneAndUpdate"], function () {
    return __awaiter(this, void 0, void 0, function* () {
        const data = this.getUpdate();
        if (data.password) {
            data.password = yield bcrypt_1.default.hash(data.password, user_model_1.saltrounds);
        }
        if (data.email) {
            data.email = data.email.toLowerCase();
        }
    });
});
// pre find make email case insensitive
AdminSchema.pre(["find", "findOne"], function () {
    const query = this.getQuery();
    if (query.email) {
        query.email = query.email.toLowerCase();
    }
});
exports.Admin = mongoose_1.default.model("admins", AdminSchema);
//# sourceMappingURL=admin.model.js.map