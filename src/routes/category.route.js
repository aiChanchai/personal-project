import express from "express";
import authenticate from "../middlewares/authenticate.middleware.js";
import {
  getAllCategoriesController,
  getHabitByCategoryController,
} from "../controllers/category.controller.js";

const categoryRoute = express.Router();

categoryRoute.get("/:id/habits", authenticate, getHabitByCategoryController);
categoryRoute.get("/", authenticate, getAllCategoriesController);

export default categoryRoute;
