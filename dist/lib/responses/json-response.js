"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonResponse = void 0;
/**
 * Represents a base class for JSON responses.
 */
class JsonResponse {
    constructor() { }
    static success(props, res) {
        const data = {
            status: props.status || 200,
            message: props.message || "Success",
            data: props.data || null,
            meta: props.meta,
        };
        return (res && res.status(data.status).json(data)) || data;
    }
    static error(props, res) {
        const data = {
            status: props.status || 500,
            message: props.message || "Something Went Wrong",
            error: props.error,
        };
        return (res && res.status(data.status).json(data)) || data;
    }
    static validationError(props, res) {
        const data = {
            status: 422,
            message: "Validation Error",
            errors: props.errors,
        };
        return (res && res.status(data.status).json(data)) || data;
    }
}
exports.JsonResponse = JsonResponse;
//# sourceMappingURL=json-response.js.map