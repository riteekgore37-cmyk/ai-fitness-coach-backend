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
const exercise_type_enum_1 = require("../../common/enums/exercise-type.enum");
const equipment_model_1 = require("../../common/models/equipment.model");
const exercise_model_1 = require("../../common/models/exercise.model");
const muscle_model_1 = require("../../common/models/muscle.model");
const db_store_1 = require("../../seeder/helpers/db-store");
const seeder_wrapper_1 = require("../../seeder/helpers/seeder-wrapper");
exports.default = (0, seeder_wrapper_1.seederWrapper)(exercise_model_1.Exercise, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('preparing exercises data... (this may take a while)');
    let randomDuration = 30 + Math.floor(Math.random() * 60);
    const data = (yield Promise.all(db_store_1.dbStore.excerisesDataset.map(function (e) {
        return __awaiter(this, void 0, void 0, function* () {
            const primaryMuscle = yield muscle_model_1.Muscle.findOne({ name: e.target }).exec();
            const equipment = yield equipment_model_1.Equipment.findOne({ name: e.equipment }).exec();
            // Skip exercises where muscle or equipment is not found in DB
            if (!primaryMuscle || !equipment) {
                console.warn(`Skipping exercise "${e.name}": muscle "${e.target}" or equipment "${e.equipment}" not found`);
                return null;
            }
            return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ name: e.name, category: e.bodyPart, exerciseType: e.type }, (e.type === exercise_type_enum_1.ExerciseType.WEIGHT &&
                {
                    reps: 10 + Math.floor(Math.random() * 10),
                    sets: e.sets,
                    duration: 0,
                }
                ||
                    {
                        duration: randomDuration,
                    })), { expectedDurationRange: (e.type === exercise_type_enum_1.ExerciseType.WEIGHT && {
                    min: 10 + Math.floor(Math.random() * 10),
                    max: 30 + Math.floor(Math.random() * 30),
                } ||
                    {
                        min: randomDuration,
                        max: randomDuration,
                    }) }), (e.instructions === "" &&
                {
                    instructions: "Do this exercise",
                }
                ||
                    {
                        instructions: e.instructions,
                    })), (e.benefits === "" &&
                {
                    benefits: "You will get stronger",
                }
                ||
                    {
                        benefits: e.benefits,
                    })), { targetMuscles: {
                    primary: primaryMuscle._id,
                    secondary: primaryMuscle._id,
                }, equipments: [equipment._id], coverImage: e.gif_url, media: {
                    type: 'image',
                    url: e.gif_url,
                }, isDeleted: false });
        });
    }))).filter(Boolean);
    console.log(`inserting ${data.length} exercises...`);
    // Insert in batches to avoid memory issues
    const batchSize = 100;
    for (let i = 0; i < data.length; i += batchSize) {
        yield exercise_model_1.Exercise.insertMany(data.slice(i, i + batchSize), { ordered: false }).catch(err => {
            if (err.code !== 11000)
                throw err; // ignore duplicate key errors
        });
    }
}));
//# sourceMappingURL=005-exercises.seeder.js.map