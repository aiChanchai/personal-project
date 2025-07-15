import prisma from "../config/prisma.config.js";

export const getHabitByCategory = async (categoryId, userId) => {
  // 1. รับ userId มาด้วย
  return await prisma.habit.findMany({
    where: {
      // 2. เพิ่มเงื่อนไขให้ค้นหาเฉพาะ Habit ของ User คนนี้
      AND: [{ categoryId: categoryId }, { userId: userId }],
    },
    // 3. (แนะนำ) แก้ไข select ให้ส่งข้อมูลที่ Frontend ต้องใช้กลับไปให้ครบ
    select: {
      id: true,
      title: true,
      description: true, // เพิ่ม description
      weeklyGoal: true,
      createdAt: true,
      categoryId: true, // เพิ่ม categoryId
    },
  });
};

export const getAllCategory = async () => {
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
