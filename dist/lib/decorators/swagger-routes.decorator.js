"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerDelete = exports.SwaggerPatch = exports.SwaggerPut = exports.SwaggerPost = exports.SwaggerGet = exports.SwaggerRoute = void 0;
const swagger_1 = require("../swagger/swagger");
const calling_file_helper_1 = require("../utils/calling-file.helper");
const SwaggerRoute = (path = "", method) => {
    return (target, propertyKey) => {
        target.constructor['targetName'] = target.constructor.name + (0, calling_file_helper_1.getCallingFileName)();
        swagger_1.swaggerRegistry.updateRoute(target.constructor['targetName'], {
            propertyKey,
            path,
            method,
        });
    };
};
exports.SwaggerRoute = SwaggerRoute;
const SwaggerGet = (path = "") => (0, exports.SwaggerRoute)(path, "get");
exports.SwaggerGet = SwaggerGet;
const SwaggerPost = (path = "") => (0, exports.SwaggerRoute)(path, "post");
exports.SwaggerPost = SwaggerPost;
const SwaggerPut = (path = "") => (0, exports.SwaggerRoute)(path, "put");
exports.SwaggerPut = SwaggerPut;
const SwaggerPatch = (path = "") => (0, exports.SwaggerRoute)(path, "patch");
exports.SwaggerPatch = SwaggerPatch;
const SwaggerDelete = (path = "") => (0, exports.SwaggerRoute)(path, "delete");
exports.SwaggerDelete = SwaggerDelete;
//# sourceMappingURL=swagger-routes.decorator.js.map