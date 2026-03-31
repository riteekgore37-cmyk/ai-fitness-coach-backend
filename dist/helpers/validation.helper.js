"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationErrorHandler = exports.paramsValidator = exports.queryValidator = exports.bodyValidator = void 0;
const json_response_1 = require("../lib/responses/json-response");
const express_joi_validation_1 = require("express-joi-validation");
const joi_1 = __importDefault(require("joi"));
const validator = (0, express_joi_validation_1.createValidator)({ passError: true });
exports.bodyValidator = validator.body;
exports.queryValidator = validator.query;
const paramsValidator = (schemaOrParam) => typeof schemaOrParam === "string"
    ? validator.params(joi_1.default.object({ [schemaOrParam]: joi_1.default.string().required() }))
    : validator.params(schemaOrParam);
exports.paramsValidator = paramsValidator;
const validationErrorHandler = (err, _req, res, next) => {
    if (err && err.error && err.error.isJoi) {
        console.log(`err`, err.error);
        const errors = err.error.details.map((detail) => detail.message);
        return json_response_1.JsonResponse.validationError({
            errors,
        }, res);
    }
    else {
        // pass on to another error handler
        next(err);
    }
};
exports.validationErrorHandler = validationErrorHandler;
//# sourceMappingURL=validation.helper.js.map