import express from "express";
import { ENV } from "./configs/constant.js";
import cors from "cors";
import errorHandler from "./middlewares/error.handler.js";
import { connectDB } from "./db/connection.js";
import taskRouter from "./routes/task.route.js";
import aiRouter from "./routes/ai.route.js";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).send("API is healthy");
});

app.use("/v1/task", taskRouter);
app.use("/v1/ai", aiRouter);

app.use(errorHandler);

app.listen(ENV.APP_PORT, () => {
  if (ENV.APP_ENV === "development") {
    console.log(`Listening to the port ${ENV.APP_PORT}`);
    connectDB();
  }
});
