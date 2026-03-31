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
exports.TemplateService = void 0;
const template_model_1 = require("../../../../../common/models/template.model");
const http_error_1 = require("../../../../../lib/error-handling/http-error");
const crud_service_1 = require("../../../../../lib/services/crud.service");
class TemplateService extends (0, crud_service_1.CrudService)(template_model_1.Template) {
    createForUser(createParams) {
        return __awaiter(this, void 0, void 0, function* () {
            let template = yield this.model.findOne({ name: createParams.name, user: createParams.user });
            if (template) {
                throw new http_error_1.HttpError(400, "template already exists");
            }
            return this.model.create(createParams);
        });
    }
}
exports.TemplateService = TemplateService;
//# sourceMappingURL=templates.service.js.map