"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = require("./router");
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
const http_1 = __importDefault(require("http"));
const sockets_1 = require("./sockets");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
(0, sockets_1.initSocket)(server);
//TODO used for dev, remove { origin: 'http://localhost:5173' }
app.use((0, cors_1.default)({ origin: 'http://localhost:5173', credentials: true }));
app.use(express_1.default.json());
app.use('/api', router_1.router);
const PORT = Number.parseInt(process.env.PORT || '3000');
exports.pool = new pg_1.Pool({
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
