import {
  createCategory,
  deleteCategory,
  deleteUser,
  getAllUsers,
  getCategoryById,
  getUserById,
  searchUserByEmail,
  updateCategory,
  updateUser,
} from "../services/admin.service.js";
import createError from "../utils/create-error.util.js";

export async function getAllUsersController(req, res, next) {
  try {
    const users = await getAllUsers(); //ดึงข้อมูลทั้งหมด
    res.json(users);
  } catch (error) {
    next(error);
  }
}

export async function getUserController(req, res, next) {
  try {
    const userId = Number(req.params.id);
    const user = await getUserById(userId);

    if (!user) {
      throw createError(404, "User not found");
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function updateUserController(req, res, next) {
  try {
    const userId = Number(req.params.id);
    const { name, email, role } = req.body;

    //ตรวจว่า role ถูกต้องมั้ย(ถ้าส่งมา)
    if (role && !["ADMIN", "USER"].includes(role)) {
      throw createError(400, "Invalid role value");
    }

    const updatedUser = await updateUser(userId, { email, name, role });

    if (!updatedUser) {
      throw createError(404, "User not found");
    }

    res.json(updatedUser);
  } catch (error) {
    next();
  }
}
export async function deleteUserController(req, res, next) {
  try {
    const userId = Number(req.params.id);

    //เช็คว่ามี user จริงมั้ย
    const existUser = await getUserById(userId);
    if (!existUser) {
      throw createError(404, "User not found");
    }

    const deletedUser = await deleteUser(userId);

    res.json({ message: `User ${deletedUser.email} deleted successfully` });
  } catch (error) {
    next(error);
  }
}

export async function createCategoryController(req, res, next) {
  try {
    const { title } = req.body;
    const newCategory = await createCategory(title);
    res.status(201).json(newCategory);
  } catch (error) {
    if (error.code === "P2002") {
      throw createError(409, "Category title already exists");
    }
    next(error);
  }
}

export async function updateCategoryController(req, res, next) {
  try {
    const categoryId = Number(req.params.id);
    const { title } = req.body;
    const existCategory = await getCategoryById(categoryId);
    if (!existCategory) {
      throw createError(404, "Category not found");
    }

    const updatedCategory = await updateCategory(categoryId, title);
    res.json(updatedCategory);
  } catch (error) {
    if (error.code === "P2002") {
      throw createError(409, "Category title already exists");
    }
    next(error);
  }
}

export async function deleteCategoryController(req, res, next) {
  try {
    const categoryId = Number(req.params.id);

    const existCategory = await getCategoryById(categoryId);
    if (!existCategory) {
      throw createError(404, "Category not found");
    }

    const deletedCategory = await deleteCategory(categoryId);

    res.json({
      message: `Category '${deletedCategory.title} deleted successfully'`,
    });
  } catch (error) {
    next(error);
  }
}

export async function searchUserByEmailController(req, res, next) {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: "Query required" });
    }

    const lowerCased = q.toLowerCase();

    const users = await searchUserByEmail(lowerCased);
    res.json(users);
  } catch (error) {
    next(error);
  }
}
