import prisma from "../config/prisma.config.js";

export const getHabitByCategory = async (categoryId) => {
  return await prisma.habit.findMany({
    where: { categoryId },
    select: {
      id: true,
      title: true,
      weeklyGoal: true,
      createdAt: true,
      user: {
        select: { name: true, email: true },
      },
    },
  });
};

export const getAllCategories = async () => {
  return await prisma.category.findMany({
    orderBy: {
      id: "asc",
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
    },
  });
};
