"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDB = void 0;
const server_1 = require("../server");
const create = async ({ username, password, }) => {
    const res = await server_1.pool.query(`INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`, [username, password]);
    return res.rows[0] || null;
};
const login = async ({ username, password, }) => {
    const res = await server_1.pool.query(`SELECT * FROM users WHERE username=$1 AND password=$2`, [username, password]);
    return res.rows[0] || null;
};
const findByUsername = async ({ username, }) => {
    const res = await server_1.pool.query(`SELECT * FROM users WHERE username=$1`, [
        username,
    ]);
    return res.rows[0] || null;
};
const findById = async ({ id }) => {
    const res = await server_1.pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
    return res.rows[0] || null;
};
exports.userDB = {
    create,
    login,
    findById,
    findByUsername,
};
