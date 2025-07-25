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

app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json());
app.use('/api', router);

const PORT = Number.parseInt(process.env.PORT || '3000');

export const pool = new Pool({
  connectionString: process.env.DB_URL,
  idleTimeoutMillis: 30000,
});

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
