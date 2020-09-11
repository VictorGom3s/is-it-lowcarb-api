import Redis from 'ioredis';
import dotenv from 'dotenv';
dotenv.config();

const db = new Redis(process.env.REDIS_URL);

export default db;
