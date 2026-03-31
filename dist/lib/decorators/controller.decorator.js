"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const swagger_1 = require("../swagger/swagger");
const calling_file_helper_1 = require("../utils/calling-file.helper");
const Controller = (prefix, options = {}) => {
    // default options
    const { autoTag = true } = options;
    return (target) => {
        const originalConstructor = target;
        const newConstructor = function (...args) {
            const instance = new originalConstructor(...args);
            instance.prefix = prefix || instance.prefix;
            return instance;
        };
        newConstructor.prototype = originalConstructor.prototype;
        target.prototype.constructor["targetName"] =
            target.prototype.constructor.name + (0, calling_file_helper_1.getCallingFileName)();
        swagger_1.swaggerRegistry.setControllerPrefix(target.prototype.constructor["targetName"], prefix);
        if (autoTag) {
            swagger_1.swaggerRegistry.setControllerTags(target.prototype.constructor["targetName"], [
                prefix
                    .split("/")
                    .slice(1)
                    .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1))
                    .join(" - "),
            ]);
        }
        return newConstructor;
    };
};
exports.Controller = Controller;
//# sourceMappingURL=controller.decorator.js.map