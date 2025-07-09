import express from "express";
import authenticate from "../middlewares/authenticate.middleware.js";
import { getHabitByCategoryController } from "../controllers/category.controller.js";

const categoryRoute = express.Router();

categoryRoute.get("/:id/habits", authenticate, getHabitByCategoryController);

export default categoryRoute;
