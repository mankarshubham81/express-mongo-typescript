import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.dvpbbh6.mongodb.net/?appName=Cluster0`;
// const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.dvpbbh6.mongodb.net/?appName=Cluster0`;
// mongodb + srv://Sampleuser2181:samplePassword@cluster0.dvpbbh6.mongodb.net/?appName=Cluster0
// `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.dvpbbh6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// retryWrites=true&w=majority&appName=Cluster0


const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
}