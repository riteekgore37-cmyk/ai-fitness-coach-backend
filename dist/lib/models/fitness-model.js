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
exports.FitnessModel = void 0;
const exercise_type_enum_1 = require("../../common/enums/exercise-type.enum");
const config_1 = require("../../configs/config");
const endpoint = '/fitness';
class FitnessModel {
    static predictWorkout(params) {
        return __awaiter(this, void 0, void 0, function* () {
            params.level = params.level.split(' ').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
            params.goal = params.goal.split(' ').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
            params.gender = params.gender.toUpperCase();
            const response = yield fetch(`${config_1.config.modelsServerUrl}${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(params),
            });
            if (!response.ok) {
                console.error(yield response.text());
                throw new Error("Failed to fetch data from the server");
            }
            return response.text().then((data) => {
                data = data.replace('NaN', exercise_type_enum_1.ExerciseType.DURATION.toString()).replace('\n', '');
                return JSON.parse(data);
            });
        });
    }
}
exports.FitnessModel = FitnessModel;
//# sourceMappingURL=fitness-model.js.map