import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// ROUTES
import userRoutes from './routes/users.js';
import qrCodeRoutes from './routes/qrcode.js';

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

app.use('/users', userRoutes);
app.use('/qr', qrCodeRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL_DEV, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => app.listen(PORT, () => console.log(`Server runnning on port: ${PORT}`)))
  .catch((error) => console.log(error));