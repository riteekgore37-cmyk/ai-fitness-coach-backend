"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerMiddleware = void 0;
/**
 * Decorator that adds a prefix to a controller's path.
 * @param prefix - The prefix to be added.
 * @returns A decorator function.
 */
const ControllerMiddleware = (middleware) => {
    return (target) => {
        const originalConstructor = target;
        const newConstructor = function (...args) {
            const instance = new originalConstructor(...args);
            instance.router.use(middleware);
            return instance;
        };
        newConstructor.prototype = originalConstructor.prototype;
        return newConstructor;
    };
};
exports.ControllerMiddleware = ControllerMiddleware;
//# sourceMappingURL=controller-middleware.decorator.js.map