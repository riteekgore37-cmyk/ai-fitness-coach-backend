"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcAge = void 0;
const calcAge = (dob) => {
    const diff = Date.now() - dob.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
};
exports.calcAge = calcAge;
//# sourceMappingURL=age.js.map