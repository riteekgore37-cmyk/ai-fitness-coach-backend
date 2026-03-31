"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtHelper = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../configs/config");
class JwtHelper {
    static generateToken(payload) {
        return jsonwebtoken_1.default.sign(payload, config_1.config.jwt.secret, {
            expiresIn: config_1.config.jwt.expiresIn,
        });
    }
    static verifyToken(role) {
        return (req, res, next) => {
            let authHeader = req.headers["authorization"];
            const token = authHeader && authHeader.split(" ")[1];
            if (!token) {
                return res
                    .status(401)
                    .json({ success: false, code: 401, message: "Unauthorized" });
            }
            jsonwebtoken_1.default.verify(token, config_1.config.jwt.secret, (err, tokenData) => {
                if (err)
                    return res
                        .status(403)
                        .json({ success: false, code: 403, message: "Invalid Token!" });
                if (!role.includes(tokenData.role))
                    return res
                        .status(401)
                        .json({ success: false, code: 401, message: "Unauthorized" });
                req.tokenData = tokenData;
                next();
            });
        };
    }
}
exports.JwtHelper = JwtHelper;
//# sourceMappingURL=jwt.helper.js.map