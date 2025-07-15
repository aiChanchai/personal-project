import {
  getAllCategory,
  getHabitByCategory,
} from "../services/category.service.js";

export async function getHabitByCategoryController(req, res, next) {
  try {
    const categoryId = Number(req.params.id);
    const userId = req.user.id;

    const habits = await getHabitByCategory(categoryId, userId);
    res.json(habits);
  } catch (error) {
    next(error);
  }
}

export async function getAllCategoryController(req, res, next) {
  try {
    const category = await getAllCategory();
    res.json(category);
  } catch (error) {
    next(error);
  }
}
