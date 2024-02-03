import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';

import { DatabaseConfig } from './configs/database';
import { StorageConfig } from './configs/storage';

import authRoutes from './routes/auth.route';
import propertyRoutes from './routes/property.route';
import messageRoutes from './routes/message.route';
import { jwtMiddleware } from "./middlewares/jwt.middleware";

const app = express();
const dbConfig = new DatabaseConfig(app);
const multipleFileStorageConfig = new StorageConfig('image');

// initialize middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(multipleFileStorageConfig.setMultipleFileStorageConfig());


// Routes intialization
app.use('/images', express.static('images'));
app.use('/unsecure', authRoutes);
app.use('/property', propertyRoutes);
app.use('/message', jwtMiddleware, messageRoutes);

dbConfig.connect();