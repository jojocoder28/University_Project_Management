import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./router/userRouter.js";
import universityRouter from "./router/universityRouter.js";
import projectRouter from "./router/projectRouter.js";
import fs from 'fs';
import path from 'path';

const app = express();
config({ path: "./config/config.env" });


const allowedOrigins = [process.env.FRONTEND_URL, process.env.ADMIN_URL, process.env.UNIVERSITY_ADMIN_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/university", universityRouter);
app.use("/api/v1/project", projectRouter);


dbConnection();

app.use(errorMiddleware);
export default app;
