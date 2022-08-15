import express, { json } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

app.use(json());

app.listen(port);

app.use(userRoutes);
