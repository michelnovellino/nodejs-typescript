import dotenv from "dotenv";

dotenv.config();

import express, { Application } from "express";
import morgan from "morgan";
import AuthRoute from "./routes/auth.route";
const app: Application = express();
app.set("port", process.env.PORT || 3000)

app.use(morgan('dev'))
app.use(express.json())

app.use(AuthRoute)
export default app;