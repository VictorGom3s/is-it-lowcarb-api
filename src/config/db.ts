import Redis from 'ioredis';
import dotenv from 'dotenv';
dotenv.config();

const db = new Redis();

export default db;
