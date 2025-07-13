import express from "express";
import authRoute from "./routes/auth.route.js";
import notFoundMiddleware from "./middlewares/not-found.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import habitRoute from "./routes/habits.route.js";
import adminRoute from "./routes/admin.route.js";
import categoryRoute from "./routes/category.route.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/api/auth", authRoute);

app.use("/api/habits", habitRoute);

app.use("/api/categories", categoryRoute);

app.use("/api/admin", adminRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
