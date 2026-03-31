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
const role_enum_1 = require("../../common/enums/role.enum");
const admin_model_1 = require("../../modules/console/common/models/admin.model");
const seeder_wrapper_1 = require("../../seeder/helpers/seeder-wrapper");
exports.default = (0, seeder_wrapper_1.seederWrapper)(admin_model_1.Admin, () => __awaiter(void 0, void 0, void 0, function* () {
    // create super admin
    yield admin_model_1.Admin.create({
        name: "Super Admin",
        email: "super@app.com",
        password: "super",
        image: `https://placehold.co/300x400`,
        gender: "M1 Abrams Tank",
        role: role_enum_1.Role.SUPER_ADMIN,
    });
}));
//# sourceMappingURL=001-admins.seeder.js.map