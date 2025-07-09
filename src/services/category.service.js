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
