import prisma from "../config/prisma.config.js";

export default async function (signal) {
  //SIGINT(Ctrl+C),SIGTERM(ระบบหรือคำสั่ง(docker))
  console.log(`\nReceived ${signal},Shutting Down...`); //แสดงเพื่อให้รู้ว่าแอปกำลังปิดตัวลง
  try {
    await prisma.$disconnect();
    console.log("Prisma disconnected");
  } catch (error) {
    console.log("Error during disconnection", error);
  } finally {
    process.exit(0);
  }
}
