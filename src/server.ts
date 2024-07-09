import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import authorRoutes from './routes/Author';


const router = express();

/* Connect  to Mongo**/
mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info("connected to Mongo..")
        startServer();

    })
    .catch((err) => {
        Logging.error("mongoose.connect error: " + err);
    })

// Only start the server if the mongo is connected

const startServer = () => {
    router.use((req, res, next) => {
        // log the request
        Logging.info(`Incomming --> Method: [${req.method}] - Url: [${req.url}] - IP : [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            // Log the Response
            Logging.info(`Incomming --> Method: [${req.method}] - Url: [${req.url}] - IP : [${req.socket.remoteAddress}] - status: [${res.statusCode}]`);

        });
        next();

    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    /** Rules of our API */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-HJeaders', 'Origin, X-Requested-with, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    })

    // ***** Routes ///
    router.use('/authors', authorRoutes);


    //***** */ Healthcheck ///
    router.get('/ping', (req, res, next) => {
        res.status(200).json({ message: 'pong' });
    })

    router.use((req, res, next) => {
        const error = new Error('Not Found');
        Logging.error(error);
        res.status(400).json({ message: error.message });
    });


    http.createServer(router).listen(config.server.port, () => {
        Logging.info(`Server is running on port ${config.server.port}`)
    })

};
