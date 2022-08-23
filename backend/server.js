import express from 'express';
import cors from 'cors';
import {config} from './config/config.js';
import {connectDB} from './config/db.js';
import {patientRoutes} from './routes/patientRoutes.js';

connectDB();

const app = express();

app.use(cors({
    origin: config.cors,
}));

app.use(express.json());

app.use('/api/patients', patientRoutes);



app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});