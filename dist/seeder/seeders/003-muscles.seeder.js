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
const muscle_model_1 = require("../../common/models/muscle.model");
const db_store_1 = require("../../seeder/helpers/db-store");
const seeder_wrapper_1 = require("../../seeder/helpers/seeder-wrapper");
exports.default = (0, seeder_wrapper_1.seederWrapper)(muscle_model_1.Muscle, () => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all(db_store_1.dbStore.musclesDataset.map(function (m) {
        return __awaiter(this, void 0, void 0, function* () {
            return muscle_model_1.Muscle.create({ name: m.name, image: m.image, isDeleted: false });
        });
    }));
}));
//# sourceMappingURL=003-muscles.seeder.js.map