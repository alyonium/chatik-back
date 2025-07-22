import express from 'express';
import cors from 'cors';
import { router } from './router';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import http from 'http';
import { initSocket } from './sockets';

dotenv.config();

const app = express();
const server = http.createServer(app);
initSocket(server);

//TODO used for dev, remove { origin: 'http://localhost:5173' }
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use('/api', router);

const PORT = Number.parseInt(process.env.PORT || '3000');

export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number.parseInt(process.env.DB_PORT || '5432'),
  idleTimeoutMillis: 30000,
});

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
