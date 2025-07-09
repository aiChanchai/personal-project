import prisma from "../config/prisma.config.js";

export const createHabit = async (habitData) => {
  return await prisma.habit.create({
    data: habitData,
  });
};

export const getHabitsByUserId = async (userId) => {
  return await prisma.habit.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const getHabitById = async (id, userId) => {
  return await prisma.habit.findFirst({
    where: {
      id,
      userId,
    },
  });
};

export const updateHabit = async (id, habitData) => {
  return await prisma.habit.update({
    where: { id },
    data: habitData,
  });
};

export const deleteHabit = async (id) => {
  return await prisma.habit.delete({
    where: { id },
  });
};
