import express from 'express';
import cors from 'cors';
import {config} from './config/config.js';
import {connectDB} from './config/db.js';
import {patientRoutes} from './routes/patientRoutes.js';
import {handleError, notFound} from './middleware/errorMiddleware.js';
import {userRoutes} from './routes/userRoutes.js';
import {protect} from './middleware/authMiddleware.js';
import path from 'path';

connectDB();

const app = express();

app.use(cors({
    origin: config.cors,
}));

app.use(express.json());

app.use('/api/patients', protect, patientRoutes);
app.use('/api/users', userRoutes);

// --------------------------deployment------------------------------
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/Frontend/build")));

    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname, "Frontend", "build", "index.html")),
    );
} else {
    app.get("/", (req, res) => {
        res.send("API is running..");
    });
}
// --------------------------deployment------------------------------

app.use(notFound);
app.use(handleError);

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});