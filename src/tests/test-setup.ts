import mongoose from 'mongoose';
import { config } from '../config/config';
import Logging from '../library/Logging';

// Connect to MongoDB before running tests
beforeAll(async () => {
    await mongoose.connect(config.mongo.url, {
        retryWrites: true,
        w: 'majority',
    });
    Logging.info('Connected to Test MongoDB');
});

// Drop the database after all tests
afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});
