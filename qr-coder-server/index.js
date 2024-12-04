import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import {config} from "dotenv";
import passport from "passport";

// PASSPORT
import passportConfig from "./config/passport.js"; 

// ROUTES
import userRoutes from './routes/users.js';
import qrCodeRoutes from './routes/qrcode.js';
import googleRoutes from './routes/google.js';
import adminRoutes from './routes/admin.js';



const app = express();
config({path: './.env'});

passportConfig();

app.use(cors());
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

app.use('/users', userRoutes);
app.use('/qr', qrCodeRoutes);
app.use('/auth/google', googleRoutes);
app.use('/admin', adminRoutes)
app.use(passport.initialize());


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL_DEV, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => app.listen(PORT, () => console.log(`Server runnning on port: ${PORT}`)))
  .catch((error) => console.log(error));

