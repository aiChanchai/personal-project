import express from "express";
import authenticate from "../middlewares/authenticate.middleware.js";
import {
  habitSchema,
  updateHabitSchema,
  validate,
} from "../validations/validator.js";
import * as habitController from "../controllers/habit.controller.js";

const habitRoute = express.Router();

habitRoute.post(
  "/",
  authenticate,
  validate(habitSchema),
  habitController.createHabitController
);

habitRoute.get("/", authenticate, habitController.getAllHabitsController);
habitRoute.get("/:id", authenticate, habitController.getHabitByIdController);
habitRoute.patch(
  "/:id",
  authenticate,
  validate(updateHabitSchema),
  habitController.updateHabitController
);

habitRoute.delete("/:id", authenticate, habitController.deleteHabitController);

export default habitRoute;
