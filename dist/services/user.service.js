"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_sql_1 = require("../db/user.sql");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_service_1 = require("./token.service");
const registration = async ({ username, password, }) => {
    if (!username || !password) {
        throw new Error('Username and password are required');
    }
    const isUsernameExist = await user_sql_1.userDB.findByUsername({ username });
    if (isUsernameExist) {
        throw new Error('Username already exists');
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 3);
    const user = await user_sql_1.userDB.create({ username, password: hashedPassword });
    const token = token_service_1.tokenService.generate({
        id: user.id,
        username: user.username,
    });
    return { ...user, token };
};
const login = async ({ username, password, }) => {
    const user = await user_sql_1.userDB.findByUsername({ username });
    if (!user) {
        throw new Error('User does not exist');
    }
    const isPasswordsEqual = await bcrypt_1.default.compare(password, user.password);
    if (!isPasswordsEqual) {
        throw new Error('Passwords do not match');
    }
    const token = token_service_1.tokenService.generate({
        id: user.id,
        username: user.username,
    });
    return { ...user, token };
};
const find = async ({ id }) => {
    return await user_sql_1.userDB.findById({ id });
};
exports.userService = {
    registration,
    login,
    find,
};
