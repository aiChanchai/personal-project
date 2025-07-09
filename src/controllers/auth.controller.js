import { createUser, getUserBy } from "../services/user.service.js";
import createError from "../utils/create-error.util.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function register(req, res, next) {
  try {
    //validation
    const { email, name, password } = req.body;

    //หาว่ามี email ซ้ำยัง
    if (email) {
      let foundUserEmail = await getUserBy("email", email);
      if (foundUserEmail) {
        createError(409, `Email :${email} already register`);
      }
    }

    const newUser = {
      email,
      name,
      password: await bcrypt.hash(password, 10),
    };

    await createUser(newUser);

    res.send("register successful");
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body; //user ส่งมา
    //find user
    const foundUser = await getUserBy("email", email);
    if (!foundUser) {
      createError(401, "Invalid login");
    }
    //check password
    const checkPassword = await bcrypt.compare(password, foundUser.password);
    if (!checkPassword) {
      createError(401, "Invalid login");
    }
    // create jwt token
    const payload = { id: foundUser.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "15d",
    });
    const { password: pw, createdAt, updatedAt, ...userData } = foundUser;
    res.json({
      message: "Login controllers",
      token: token,
      user: userData,
    });
  } catch (error) {
    next(error);
  }
}

export function getUser(req, res, next) {
  res.json({ user: req.user });
}
