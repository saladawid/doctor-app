import express from 'express';
import cors from 'cors';
import {config} from './config/config.js';
import {connectDB} from './config/db.js';

connectDB();

const app = express();

app.use(cors({
    origin: config.cors,
}));


app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});