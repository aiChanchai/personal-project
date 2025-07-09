import { object, string, date, ref, number } from "yup";
import createError from "../utils/create-error.util.js";

export const registerSchema = object({
  email: string().required("Email is required"),
  name: string().required("Name is required"),
  password: string().min(5).required("Password is required"),
  confirmPassword: string().oneOf(
    [ref("password")],
    "confirmpassword must match password"
  ),
}).noUnknown(); //ไม่อนุญาติให้มี field ที่ไม่อยู่ใน schema นี้

export const loginSchema = object({
  email: string().required("email is required"),
  password: string().required("password is required"),
}).noUnknown();

export function validate(schema, options = {}) {
  return async function (req, res, next) {
    try {
      const cleanBody = await schema.validate(req.body, {
        abortEarly: false, //รวบรวม error ทั้งหมด
        ...options,
      });
      req.body = cleanBody; // ถ้าผ่านได้ข้อมูล
      next();
    } catch (error) {
      let errMessage = error.errors.join("||");
      console.log(errMessage);
      createError(400, errMessage);
    }
  };
}

export const habitSchema = object({
  title: string().required("Title is required"),
  description: string().optional(),
  weeklyGoal: number()
    .min(1, "weekly goal must be at least 1")
    .required("Weekly goal is required"),
});

export const updateHabitSchema = object({
  title: string().optional(),
  description: string().optional(),
  weeklyGoal: number().min(1).optional(),
});

export const categorySchema = object({
  title: string().trim().required("Category name is required"),
});
