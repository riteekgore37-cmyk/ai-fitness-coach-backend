"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadExercisesDataset = void 0;
const path = __importStar(require("path"));
const csv = require('csv-parser');
const fs = require('fs');
const filePath = path.join(__dirname, '../../resources/exercises.csv');
const loadExercisesDataset = () => __awaiter(void 0, void 0, void 0, function* () {
    let results = [];
    yield new Promise((resolve) => {
        fs
            .createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => {
            // skip empty rows
            if (Object.values(data).some((v) => !v)) {
                return;
            }
            if (!data.type) {
                console.log("type is null", data);
            }
            results.push(Object.assign(Object.assign({}, data), { gym: data.gym == '1', home: data.home == '1', sets: parseInt(data.sets) }));
        })
            .on('end', () => {
            resolve(results);
        });
    });
    // remove duplicates by name
    const uniqueNames = new Set(results.map(e => e.name));
    results = results.filter(e => {
        const found = uniqueNames.has(e.name);
        uniqueNames.delete(e.name);
        return found;
    });
    console.log(`Loaded ${results.length} exercises from dataset`);
    return results;
});
exports.loadExercisesDataset = loadExercisesDataset;
//# sourceMappingURL=load-exercises-dataset.js.map