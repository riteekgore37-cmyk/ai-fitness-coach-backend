"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerQuery = void 0;
const swagger_1 = require("../swagger/swagger");
const calling_file_helper_1 = require("../utils/calling-file.helper");
const SwaggerQuery = (querySchema) => {
    return (target, propertyKey) => {
        const queryParams = Object.entries(querySchema).map(([key, type]) => {
            let schema;
            if (Array.isArray(type)) {
                schema = {
                    type: "string",
                    enum: type,
                };
            }
            else if (typeof type === "string") {
                schema = {
                    type,
                };
            }
            else {
                schema = Array.isArray(type["type"])
                    ? {
                        type: "string",
                        enum: type["type"],
                    }
                    : {
                        type: type.type,
                    };
            }
            return {
                name: key,
                in: "query",
                required: type["required"] || false,
                schema,
            };
        });
        target.constructor["targetName"] =
            target.constructor.name + (0, calling_file_helper_1.getCallingFileName)();
        swagger_1.swaggerRegistry.updateRoute(target.constructor["targetName"], {
            propertyKey,
            queryParams,
        });
    };
};
exports.SwaggerQuery = SwaggerQuery;
//# sourceMappingURL=swagger-query.decorator.js.map