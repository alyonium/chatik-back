import { pool } from '../server';
import { Message } from '../models/message';

const create = async ({ userId, content }: Message) => {
  const res = await pool.query(
    `INSERT INTO messages (user_id, content) VALUES ($1, $2) RETURNING *`,
    [userId, content],
  );

  return res.rows[0] || null;
};

export const messageDB = {
  create,
};
