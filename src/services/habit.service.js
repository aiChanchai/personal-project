import prisma from "../config/prisma.config.js";
import createError from "../utils/create-error.util.js";

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

export const createOrUpdateHabitEntry = async (habitId) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); //ตั้งเวลาเป็นเที่ยงคืน

  //ค้นหาว่ามี entry ของวันนี้แล้วยัง
  const existEntry = await prisma.habitEntry.findFirst({
    where: {
      habitId: habitId,
      date: {
        gte: today,
      },
    },
  });

  if (existEntry) {
    //ถ้ามีแล้วให้อัพเดทแทน
    return prisma.habitEntry.update({
      where: { id: existEntry.id },
      data: {
        status: true,
      },
    });
  } else {
    //ยังไม่มีให้สร้างใหม่
    return prisma.habitEntry.create({
      data: {
        habitId: habitId,
        date: new Date(),
        status: true,
      },
    });
  }
};

export const getHabitEntries = (habitId) => {
  return prisma.habitEntry.findMany({
    where: { habitId: habitId },
    orderBy: { date: "desc" },
  });
};

export const deleteTodayHabitEntry = async (habitId) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const entryToDelete = await prisma.habitEntry.findFirst({
    where: {
      habitId: habitId,
      date: {
        gte: today,
        lt: tomorrow,
      },
    },
  });

  if (!entryToDelete) {
    throw createError(404, "No Entry found for today");
  }

  return prisma.habitEntry.delete({
    where: { id: entryToDelete.id },
  });
};
