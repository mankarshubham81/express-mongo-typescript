import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import authorRoutes from './routes/Author';
import bookRoutes from './routes/Book';
import userRoutes from './routes/User';
import authRoutes from './routes/auth';


const app = express();

/* Connect to Mongo */
mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info("connected to Mongo..");
        startServer();
    })
    .catch((err) => {
        Logging.error("mongoose.connect error: " + err);
    });

// Only start the server if Mongo is connected
const startServer = () => {
    app.use((req, res, next) => {
        // Log the request
        Logging.info(`Incoming --> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            // Log the response
            Logging.info(`Incoming --> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });
        next();
    });

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    /** Rules of our API */
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    // Routes
    app.use('/authors', authorRoutes);
    app.use('/books', bookRoutes);
    app.use('/users', userRoutes);
    app.use('/api/auth', authRoutes);

    // Health check
    app.get('/ping', (req, res, next) => {
        res.status(200).json({ message: 'pong' });
    });

    app.get('/', (req, res, next) => {
        res.status(200).json({ message: 'Home route' });
    });

    // Error handling
    app.use((req, res, next) => {
        const error = new Error('Not Found');
        Logging.error(error);
        res.status(404).json({ message: error.message });
    });

    http.createServer(app).listen(config.server.port, () => {
        Logging.info(`Server is running on port ${config.server.port}`);
    });
};

export default app; // Export the app instance