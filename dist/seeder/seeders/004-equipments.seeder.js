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
const equipment_model_1 = require("../../common/models/equipment.model");
const db_store_1 = require("../../seeder/helpers/db-store");
const seeder_wrapper_1 = require("../../seeder/helpers/seeder-wrapper");
exports.default = (0, seeder_wrapper_1.seederWrapper)(equipment_model_1.Equipment, () => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all(db_store_1.dbStore.equipmentsDataset.map(function (e) {
        return __awaiter(this, void 0, void 0, function* () {
            return equipment_model_1.Equipment.create({ name: e.name, image: e.image, isDeleted: false });
        });
    }));
}));
//# sourceMappingURL=004-equipments.seeder.js.map