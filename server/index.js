import express from "express";
import cors from "cors";
import colors from "colors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import router from "./routes/userRoutes.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";

dotenv.config({
   path: "./config/config.env",
});

const app = express();

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// setting the routes
app.use("/", router);

const PORT = process.env.PORT || 5000;
// db & server connection
connectDB().then(() =>
   app.listen(PORT, () => {
      console.log(`server running at port ${PORT}`.bgBlue.bold);
   })
);
