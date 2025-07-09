import { getUserBy } from "../services/user.service.js";
import createError from "../utils/create-error.util.js";
import jwt from "jsonwebtoken";

export default async function (req, res, next) {
  const authorization = req.headers.authorization;
  //check headers ของ http request ต้องมี authorization
  if (!authorization || !authorization.startsWith("Bearer ")) {
    createError(401, "Unauthorized headers");
  }

  //ตรวจว่ามี token จริงมั้ย split แล้วไม่มีคือ error
  const token = authorization.split(" ")[1];
  if (!token) {
    createError(401, "Unauthorized token");
  }

  //verify token
  const payload = jwt.verify(token, process.env.JWT_SECRET);

  //เอา id จาก payload ไปหา user
  const foundUser = await getUserBy("id", payload.id);
  if (!foundUser) {
    createError(401, "Unauthorized 3");
  }

  //สร้าง userData ที่ไม่มี key : password,createdAt,uploadAt
  const { password, createdAt, updatedAt, ...userData } = foundUser;

  //ฝากข้อมูล user ไว้ที่ req(req คือ obj ฝากไว้ใน key ชื่อ req.user) เพื่อให้ controller นำข้อมูล user ไปใช้ได้
  req.user = userData;
  next();
}
