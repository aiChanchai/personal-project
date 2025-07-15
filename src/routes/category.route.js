import express from "express";
import authenticate from "../middlewares/authenticate.middleware.js";
import * as categoryController from "../controllers/category.controller.js";

const categoryRoute = express.Router();

categoryRoute.get(
  "/:id/habits",
  authenticate,
  categoryController.getHabitByCategoryController
);
categoryRoute.get(
  "/",
  authenticate,
  categoryController.getAllCategoryController
);

export default categoryRoute;
