"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("../services/user.service");
const create = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await user_service_1.userService.registration({ username, password });
        if (user) {
            return res.status(201).json(user);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === 'Username and password are required') {
                return res
                    .status(400)
                    .json({ message: 'Username and password are required' });
            }
            if (error.message === 'Username already exists') {
                return res.status(400).json({ message: 'User already exists' });
            }
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await user_service_1.userService.login({ username, password });
        if (user) {
            return res.status(201).json(user);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === 'User does not exist') {
                return res.status(404).json({ message: 'User not found' });
            }
            if (error.message === 'Passwords do not match') {
                return res
                    .status(401)
                    .json({ message: 'Invalid username or password' });
            }
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
const find = async (req, res) => {
    const { id } = req.params;
    if (id) {
        const user = await user_service_1.userService.find({ id: +id });
        if (user) {
            return res.status(201).json(user);
        }
        else {
            return res.status(404).json({ message: 'User not found' });
        }
    }
    else {
        return res.status(400).json({ error: 'User ID is required' });
    }
};
exports.userController = {
    create,
    login,
    find,
};
