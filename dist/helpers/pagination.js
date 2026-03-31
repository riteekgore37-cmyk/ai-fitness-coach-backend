"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePaginationQuery = void 0;
const parsePaginationQuery = (query) => {
    const limit = query.limit && parseInt(query.limit) || 10;
    const skip = query.skip && parseInt(query.skip) || 0;
    return {
        limit,
        skip,
    };
};
exports.parsePaginationQuery = parsePaginationQuery;
//# sourceMappingURL=pagination.js.map