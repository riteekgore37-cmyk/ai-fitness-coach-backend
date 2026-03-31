"use strict";
// mongoose seeder script
// takes an optional cli argument "--reset" to reset the database
//
// Usage:
// npm run seed
// npm run seed:reset
// node src/seeder/seed.ts
// node src/seeder/seed.ts --reset
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob = __importStar(require("glob"));
const path_1 = __importDefault(require("path"));
const load_exercises_dataset_1 = require("./helpers/load-exercises-dataset");
const db_store_1 = require("./helpers/db-store");
const load_meals_dataset_1 = require("./helpers/load-meals-dataset");
const loadDatasets = () => __awaiter(void 0, void 0, void 0, function* () {
    const exercisesDataset = yield (0, load_exercises_dataset_1.loadExercisesDataset)();
    const mealsDataset = (0, load_meals_dataset_1.loadMealsDataset)();
    let musclesDataset = exercisesDataset.map((exercise) => ({ name: exercise.target, image: exercise.target_url }));
    musclesDataset = musclesDataset.filter((value, index, self) => index === self.findIndex((t) => (t.name === value.name)));
    let equipmentsDataset = exercisesDataset.map((exercise) => ({ name: exercise.equipment, image: exercise.equipment_url }));
    equipmentsDataset = equipmentsDataset.filter((value, index, self) => index === self.findIndex((t) => (t.name === value.name)));
    const ingredientsArrays = mealsDataset.map(m => m.RecipeIngredientParts);
    const ingredientsNames = Array.from(new Set(ingredientsArrays.flat()));
    db_store_1.dbStore.excerisesDataset = exercisesDataset;
    db_store_1.dbStore.musclesDataset = musclesDataset;
    db_store_1.dbStore.equipmentsDataset = equipmentsDataset;
    db_store_1.dbStore.mealsDataset = mealsDataset;
    db_store_1.dbStore.ingredientsNames = ingredientsNames;
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    // get cli arguments
    const args = process.argv.slice(2);
    // get cli names that don't start with "--"
    const seederNames = args.filter((arg) => !arg.startsWith("--"));
    // list all files under ./seeders
    const seedersPath = path_1.default
        .relative(process.cwd(), path_1.default.join(__dirname, "**/*.seeder.{ts,js}"))
        .replace(/\\/g, "/");
    const seedersFiles = glob
        .sync(seedersPath, {})
        .map((file) => {
        return path_1.default.resolve(file);
    })
        .filter((file) => {
        if (seederNames.length === 0) {
            return true;
        }
        return seederNames.some(name => path_1.default.basename(file).includes(name));
    })
        .sort();
    console.log(seedersFiles);
    // load datasets
    yield loadDatasets();
    // run all seeders
    let count = 0;
    try {
        for (var _d = true, seedersFiles_1 = __asyncValues(seedersFiles), seedersFiles_1_1; seedersFiles_1_1 = yield seedersFiles_1.next(), _a = seedersFiles_1_1.done, !_a; _d = true) {
            _c = seedersFiles_1_1.value;
            _d = false;
            const file = _c;
            const baseName = path_1.default.basename(file);
            console.log(`Running ${baseName} ...`);
            const seeder = yield Promise.resolve(`${file}`).then(s => __importStar(require(s)));
            yield seeder.default();
            console.log(`${baseName} completed! (${++count}/${seedersFiles.length})`);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = seedersFiles_1.return)) yield _b.call(seedersFiles_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    console.log("All seeders completed!");
    process.exit(0);
});
main().catch((err) => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map