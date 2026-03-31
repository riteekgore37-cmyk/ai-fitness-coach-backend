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
exports.CrudService = void 0;
const http_error_1 = require("../error-handling/http-error");
const CrudService = (model, crudOptions) => {
    return class CrudServiceClass {
        constructor() {
            this.model = model;
        }
        create(data) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.model.create(data);
            });
        }
        updateOne(filter, data) {
            return __awaiter(this, void 0, void 0, function* () {
                filter = Object.assign(Object.assign({}, crudOptions === null || crudOptions === void 0 ? void 0 : crudOptions.defaultFilter), filter);
                yield this.existsOrThrow(filter);
                yield this.model.updateOne(filter, data);
                return (yield this.findOneOrFail(filter));
            });
        }
        updateMany(filter_1, data_1) {
            return __awaiter(this, arguments, void 0, function* (filter, data, checkExists = true) {
                filter = Object.assign(Object.assign({}, crudOptions === null || crudOptions === void 0 ? void 0 : crudOptions.defaultFilter), filter);
                if (checkExists) {
                    yield this.existsOrThrow(filter);
                }
                yield this.model.updateMany(filter, data);
                return (yield this.model.find(filter));
            });
        }
        deleteOne(filter) {
            return __awaiter(this, void 0, void 0, function* () {
                filter = Object.assign(Object.assign({}, crudOptions === null || crudOptions === void 0 ? void 0 : crudOptions.defaultFilter), filter);
                yield this.existsOrThrow(filter);
                const deleted = yield this.model.findOneAndDelete(filter);
                if (!deleted) {
                    throw new http_error_1.HttpError(404, "No Matching Result Found.");
                }
                return deleted;
            });
        }
        softDelete(filter) {
            return __awaiter(this, void 0, void 0, function* () {
                filter = Object.assign(Object.assign({}, crudOptions === null || crudOptions === void 0 ? void 0 : crudOptions.defaultFilter), filter);
                yield this.existsOrThrow(filter);
                yield this.model.updateOne(filter, { isDeleted: true });
                return (yield this.findOneOrFail(filter));
            });
        }
        list(filter_1) {
            return __awaiter(this, arguments, void 0, function* (filter, paginationOptions = {
                limit: 10,
                skip: 0,
            }, options) {
                var _a, _b;
                if (options === null || options === void 0 ? void 0 : options.filterOptions)
                    filter = Object.assign(Object.assign({}, filter), options.filterOptions);
                filter = Object.assign(Object.assign({}, crudOptions === null || crudOptions === void 0 ? void 0 : crudOptions.defaultFilter), filter);
                const query = this.model
                    .find(filter)
                    .limit(paginationOptions.limit)
                    .skip(paginationOptions.skip);
                if (options === null || options === void 0 ? void 0 : options.populateArray) {
                    query.populate(options.populateArray);
                }
                const docs = (yield query);
                const total = yield this.model.countDocuments(filter);
                return {
                    docs,
                    paginationData: {
                        total,
                        page: (_a = paginationOptions.skip) !== null && _a !== void 0 ? _a : 0,
                        perPage: (_b = paginationOptions.limit) !== null && _b !== void 0 ? _b : 10,
                    },
                };
            });
        }
        listAll(filter, options) {
            return __awaiter(this, void 0, void 0, function* () {
                filter = Object.assign(Object.assign({}, crudOptions === null || crudOptions === void 0 ? void 0 : crudOptions.defaultFilter), filter);
                const query = this.model.find(filter);
                if (options === null || options === void 0 ? void 0 : options.populateArray) {
                    query.populate(options.populateArray);
                }
                return (yield query);
            });
        }
        search(filter_1) {
            return __awaiter(this, arguments, void 0, function* (filter, paginationOptions = {
                limit: 10,
                skip: 0,
            }, options) {
                var _a, _b;
                filter = Object.assign(Object.assign({}, crudOptions === null || crudOptions === void 0 ? void 0 : crudOptions.defaultFilter), filter);
                const query = this.model
                    .find(filter)
                    .limit(paginationOptions.limit)
                    .skip(paginationOptions.skip);
                if (options === null || options === void 0 ? void 0 : options.populateArray) {
                    query.populate(options.populateArray);
                }
                const docs = (yield query);
                const total = yield this.model.countDocuments(filter);
                return {
                    docs,
                    paginationData: {
                        total,
                        page: (_a = paginationOptions.skip) !== null && _a !== void 0 ? _a : 0,
                        perPage: (_b = paginationOptions.limit) !== null && _b !== void 0 ? _b : 10,
                    },
                };
            });
        }
        findOne(filter, options) {
            return __awaiter(this, void 0, void 0, function* () {
                const query = this.model.findOne(filter);
                if (options === null || options === void 0 ? void 0 : options.populateArray) {
                    query.populate(options.populateArray);
                }
                return yield query;
            });
        }
        findOneOrFail(filter, options) {
            return __awaiter(this, void 0, void 0, function* () {
                const query = this.model.findOne(filter);
                if (options === null || options === void 0 ? void 0 : options.populateArray) {
                    query.populate(options.populateArray);
                }
                if (options === null || options === void 0 ? void 0 : options.selectArray) {
                    query.select(options.selectArray);
                }
                const document = yield query;
                if (!document) {
                    throw new http_error_1.HttpError(404, "No Matching Result Found.");
                }
                return document;
            });
        }
        existsOrThrow(filter) {
            return __awaiter(this, void 0, void 0, function* () {
                const exists = yield this.model.exists(filter);
                if (!exists) {
                    throw new http_error_1.HttpError(404, "No Matching Result Found.");
                }
            });
        }
    };
};
exports.CrudService = CrudService;
//# sourceMappingURL=crud.service.js.map