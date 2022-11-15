import express from 'express';
import cors from 'cors';
import {config} from './config/config.js';
import {connectDB} from './config/db.js';
import {handleError, notFound} from './middleware/error.middleware.js';
import {userRoutes} from './routes/user.routes.js';
import {patientRoutes} from './routes/patient.routes.js';
import {messageRoutes} from './routes/message.routes.js';
import {homeRoutes} from './routes/home.routes.js';
import {protect} from './middleware/auth.middleware.js';
import path from "path";
import dns from "node:dns";
import {testRoutes} from './routes/test.routes.js';

dns.lookup('example.org', (err, address, family) => {
    console.log('address: %j family: IPv%s', address, family);
});

connectDB();

const app = express();

app.use(cors({
    origin: config.cors,
}));

app.use(express.json());

app.use('/api/home', homeRoutes);
app.use('/api/patients', protect, patientRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', protect, messageRoutes);
app.use('/api/tests', protect, testRoutes);

// --------------------------deployment------------------------------
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/public")));

    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname, "public", "index.html")),
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