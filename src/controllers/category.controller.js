import { getHabitByCategory } from "../services/category.service.js";

export async function getHabitByCategoryController(req, res, next) {
  try {
    const categoryId = Number(req.params.id);

    const habits = await getHabitByCategory(categoryId);
    res.json(habits);
  } catch (error) {
    next(error);
  }
}
