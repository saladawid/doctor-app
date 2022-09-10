import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 3001,
    database: "mongodb+srv://dawid:lara1989@app-doctor.fcntr.mongodb.net/appdoctor?retryWrites=true&w=majority",
    cors: process.env.CORS_ORIGIN,
};