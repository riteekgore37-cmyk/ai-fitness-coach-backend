"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerDescription = void 0;
const swagger_1 = require("../swagger/swagger");
const calling_file_helper_1 = require("../utils/calling-file.helper");
const SwaggerDescription = (description) => {
    return (target, propertyKey) => {
        target.constructor['targetName'] = target.constructor.name + (0, calling_file_helper_1.getCallingFileName)();
        swagger_1.swaggerRegistry.updateRoute(target.constructor.name + (0, calling_file_helper_1.getCallingFileName)(), {
            propertyKey,
            description,
        });
    };
};
exports.SwaggerDescription = SwaggerDescription;
//# sourceMappingURL=swagger-description.decorator.js.map