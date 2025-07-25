"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generate = ({ id, username }) => {
    return jsonwebtoken_1.default.sign({ id, username }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: '12h',
    });
};
const validate = (token) => {
    return jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET);
};
exports.tokenService = {
    generate,
    validate,
};
