import {
  createHabit,
  createOrUpdateHabitEntry,
  deleteHabit,
  deleteTodayHabitEntry,
  getHabitById,
  getHabitEntries,
  getHabitsByUserId,
  updateHabit,
} from "../services/habit.service.js";
import createError from "../utils/create-error.util.js";

export async function createHabitController(req, res, next) {
  try {
    const { title, description, weeklyGoal, categoryId } = req.body;

    const newHabit = {
      title,
      description,
      weeklyGoal,
      userId: req.user.id,
      categoryId,
    };

    await createHabit(newHabit);

    res.send("Create habit successful");
  } catch (error) {
    next(error);
  }
}

export async function getAllHabitsController(req, res, next) {
  try {
    const habits = await getHabitsByUserId(req.user.id);
    res.json(habits);
  } catch (error) {
    next(error);
  }
}

export async function getHabitByIdController(req, res, next) {
  try {
    const habitId = Number(req.params.id);

    //หา habit โดย id กับ user
    const habit = await getHabitById(habitId, req.user.id);

    if (!habit) {
      createError(404, "Habit not found");
    }
    res.json(habit);
  } catch (error) {
    next(error);
  }
}

export async function updateHabitController(req, res, next) {
  try {
    const habitId = Number(req.params.id);

    //ตรวจสอบว่า habit นี้เป็นของ user จริงมั้ย
    const existHabit = await getHabitById(habitId, req.user.id);
    if (!existHabit) {
      createError(404, "Habit not found");
    }

    // อัพเดทข้อมูล
    const updated = await updateHabit(habitId, req.body);
    res.json(updated);
  } catch (error) {
    next(error);
  }
}

export async function deleteHabitController(req, res, next) {
  try {
    const habitId = Number(req.params.id);

    //เช็คว่า user นั้นเป็นเจ้าของ habit นั้นมั้ย

    const habit = await getHabitById(habitId, req.user.id);
    if (!habit) {
      createError(404, "Habit not found");
    }
    await deleteHabit(habitId);

    res.json({ message: "habit deleted successfully" });
  } catch (error) {
    next(error);
  }
}

export async function createHabitEntryController(req, res, next) {
  try {
    const { habitId } = req.params;
    const entry = await createOrUpdateHabitEntry(parseInt(habitId));
    res.status(201).json(entry);
  } catch (error) {
    next(error);
  }
}

export async function getHabitEntriesController(req, res, next) {
  try {
    const { habitId } = req.params;
    const entries = await getHabitEntries(parseInt(habitId));
    res.json(entries);
  } catch (error) {
    next(error);
  }
}

export async function deleteTodayHabitEntryController(req, res, next) {
  try {
    const { habitId } = req.params;
    const deleteHabitEntry = await deleteTodayHabitEntry(parseInt(habitId));
    res.json(deleteHabitEntry);
  } catch (error) {
    next(error);
  }
}
