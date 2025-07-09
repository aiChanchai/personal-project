import dotenv from "dotenv";
import app from "./app.js";
import shutdown from "./utils/shutdown.util.js";

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

process.on("SIGINT", () => shutdown("SIGINT")); //Ctrl + C
process.on("SIGTERM", () => shutdown("SIGTERM")); // ระบบปิดแอพเช่น Docker

//stop จับ error ที่ไม่ได้จัดการ

process.on("uncaughtException", () => shutdown("uncaughtException")); // เมื่อมี error ที่ไม่ได้ try catch
process.on("unhandledRejection", () => shutdown("unhandledRejection")); // มี promise ที่ reject แล้วไม่มี .catch
