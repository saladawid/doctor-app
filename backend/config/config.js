import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT,
    database: process.env.DATABASE,
    cors: process.env.CORS_ORIGIN,
};