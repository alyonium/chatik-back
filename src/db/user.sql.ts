import { pool } from '../server';
import { User } from '../models/user';

const create = async ({
  username,
  password,
}: Pick<User, 'password' | 'username'>): Promise<User> => {
  const res = await pool.query(
    `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`,
    [username, password],
  );

  return res.rows[0] || null;
};

const login = async ({
  username,
  password,
}: Pick<User, 'password' | 'username'>): Promise<User> => {
  const res = await pool.query(
    `SELECT * FROM users WHERE username=$1 AND password=$2`,
    [username, password],
  );

  return res.rows[0] || null;
};

const findByUsername = async ({
  username,
}: Pick<User, 'username'>): Promise<User> => {
  const res = await pool.query(`SELECT * FROM users WHERE username=$1`, [
    username,
  ]);

  return res.rows[0] || null;
};

const findById = async ({ id }: Pick<User, 'id'>): Promise<User> => {
  const res = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);

  return res.rows[0] || null;
};

export const userDB = {
  create,
  login,
  findById,
  findByUsername,
};
