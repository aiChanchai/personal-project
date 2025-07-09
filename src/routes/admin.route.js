import express from "express";

import isAdmin from "../middlewares/isAdmin.js";
import * as adminController from "../controllers/admin.controller.js";
import authenticate from "../middlewares/authenticate.middleware.js";
import { categorySchema, validate } from "../validations/validator.js";

const adminRoute = express.Router();

adminRoute.get(
  "/users",
  authenticate,
  isAdmin,
  adminController.getAllUsersController
);

adminRoute.get(
  "/users/:id",
  authenticate,
  isAdmin,
  adminController.getUserController
);

adminRoute.patch(
  "/users/:id",
  authenticate,
  isAdmin,
  adminController.updateUserController
);

adminRoute.delete(
  "/users/:id",
  authenticate,
  isAdmin,
  adminController.deleteUserController
);

adminRoute.post(
  "/categories",
  authenticate,
  isAdmin,
  validate(categorySchema),
  adminController.createCategoryController
);

adminRoute.patch(
  "/categories/:id",
  authenticate,
  isAdmin,
  validate(categorySchema),
  adminController.updateCategoryController
);

adminRoute.delete(
  "/categories/:id",
  authenticate,
  isAdmin,
  adminController.deleteCategoryController
);

adminRoute.get(
  "/search",
  authenticate,
  isAdmin,
  adminController.searchUserByEmailController
);

export default adminRoute;
