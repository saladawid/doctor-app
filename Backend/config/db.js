import mongoose from 'mongoose';
import {config} from './config.js';

import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(config.database);
        console.log(`MongoDB Connected!: ${mongoose.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};