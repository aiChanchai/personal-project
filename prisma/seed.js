import prisma from "../src/config/prisma.config.js";
import bcrypt from "bcryptjs";

const hashedPassword = bcrypt.hashSync("123456", 10);

const userData = [
  {
    email: "andy@gmail.com",
    password: hashedPassword,
    name: "Andy",
  },

  {
    email: "bobby@gmail.com",
    password: hashedPassword,
    name: "Bobby",
  },

  {
    email: "candy@gmail.com",
    password: hashedPassword,
    name: "Candy",
  },
];

async function seedDB() {
  await prisma.user.createMany({ data: userData, skipDuplicates: true }); //skipDuplicates ไม่ให้ตารางซ้ำ
}

seedDB() //ใช้ seed ข้อมุลเข้า DB
  .then(() => console.log("DB seed successful")) //seed ให้โชว์ log
  .catch(console.log) //ถ้ามี error เกิดขึ้นระหว่าง seed ให้แสดง error
  .finally(() => prisma.$disconnect); // ไม่ว่าจะสำเร็จหรือ error ให้ปิดการเชื่อต่อกับ DB
