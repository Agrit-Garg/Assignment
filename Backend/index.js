import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './database/db.js';
import authRoutes from './routes/auth.js';
import dotenv from 'dotenv';
dotenv.config();

connectDB();

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(cookieParser());

app.use('/api/auth', authRoutes);


// image upload through multer
const storage = multer.diskStorage({
    destination: (req, file, fn) => {
        fn(null, "images")
    },
    filename: (req, file, fn) => {
        fn(null, req.body.img)
        // fn(null, image1.jpg)
    }
})

const upload = multer({ storage: storage })
app.post('/api/upload', upload.single("file"), (req, res) => {
    res.status(200).json("Profile Picture has been uploaded successfully")
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`)
})
