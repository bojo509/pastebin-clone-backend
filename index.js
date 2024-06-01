import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnection from './dbConfig/dbConnection.js';
import router from './Routes/index.js';
import mongoSanitize from "express-mongo-sanitize"

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;

dbConnection();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(mongoSanitize())
app.use(router)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})