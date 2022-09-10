import mongoose from 'mongoose';
import {config} from './config.js';

export const connectDB = async () => {
    try {
        await mongoose.connect(config.database, {useNewUrlParser: true});
        console.log(`MongoDB Connected!: ${mongoose.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};