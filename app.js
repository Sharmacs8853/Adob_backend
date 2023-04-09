import express from "express";
import {} from 'dotenv/config'
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";
import cors from "cors";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoute);
app.use("/post", postRoute);

