import express from 'express';
import cors from 'cors';
import { router } from './router';
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api', router);
app.use(cors());

const PORT = Number.parseInt(process.env.PORT || '3000');

export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number.parseInt(process.env.DB_PORT || '5432'),
  idleTimeoutMillis: 30000,
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// await pool.end();
