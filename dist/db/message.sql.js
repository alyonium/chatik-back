"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageDB = void 0;
const server_1 = require("../server");
const create = async ({ userId, content }) => {
    const res = await server_1.pool.query(`
          WITH inserted AS (
          INSERT INTO messages (user_id, content)
          VALUES ($1, $2)
              RETURNING id, content, created_at, user_id
              )
          SELECT
              inserted.id,
              inserted.content,
              inserted.created_at,
              users.username
          FROM inserted
                   JOIN users ON users.id = inserted.user_id;
      `, [userId, content]);
    return res.rows[0] || null;
};
const getAll = async () => {
    const res = await server_1.pool.query(`SELECT
        messages.id,
        messages.content,
        messages.created_at,
        users.username
       FROM messages
       LEFT JOIN users ON messages.user_id = users.id
       ORDER BY messages.created_at ASC;`);
    return res.rows;
};
exports.messageDB = {
    create,
    getAll,
};
