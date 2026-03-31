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
exports.seederWrapper = void 0;
const database_1 = require("../../configs/database");
const db_store_1 = require("./db-store");
const seederWrapper = (model, seederFunction) => () => __awaiter(void 0, void 0, void 0, function* () {
    // get cli arguments
    const args = process.argv.slice(2);
    // check if reset flag is passed
    const resetFlag = args.includes("--reset");
    // connect to database
    if (!db_store_1.dbStore.dbConnected) {
        yield (0, database_1.connectDatabase)();
        db_store_1.dbStore.dbConnected = true;
    }
    // clear the collection
    if (resetFlag) {
        console.log(`Clearing collection: ${model.collection.collectionName}`);
        yield model.deleteMany({});
        console.log(`Collection ${model.collection.collectionName} cleared!`);
    }
    // run the seeder
    return seederFunction();
});
exports.seederWrapper = seederWrapper;
//# sourceMappingURL=seeder-wrapper.js.map