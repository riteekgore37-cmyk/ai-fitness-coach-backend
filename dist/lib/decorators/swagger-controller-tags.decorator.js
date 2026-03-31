"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerControllerTags = void 0;
const swagger_1 = require("../swagger/swagger");
const calling_file_helper_1 = require("../utils/calling-file.helper");
const SwaggerControllerTags = (...tags) => {
    if (!tags.length)
        return;
    return (target) => {
        target.constructor['targetName'] = target.prototype.constructor.name = (0, calling_file_helper_1.getCallingFileName)();
        swagger_1.swaggerRegistry.setControllerTags(target.constructor['targetName'], tags);
    };
};
exports.SwaggerControllerTags = SwaggerControllerTags;
//# sourceMappingURL=swagger-controller-tags.decorator.js.map