import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import router from './router/router.js';

dotenv.config()
const app = express()
const PORT = process.env.Port || 5000

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api',router)

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`))
    } catch (e) {
        console.log(e);
    }
}

start()