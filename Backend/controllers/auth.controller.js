import createError from "../utils/createError.js";
import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import e from "express";

export const register = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    const checkUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (checkUser) {
      createError(400, "Email already exist!");
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const createUser = await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: hashPassword,
      },
    });

    console.log(createUser);

    res.json({ message: "Register" });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    /*
    1.Validate
    2.Check Email
    3.Check Password
    4.Generate Token
    5.Response
    */
    // 1.Validate
    const { email, username, password } = req.body;
    // 2.Check Email
    const checkUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!checkUser) {
      createError(400, "Email or Password is Invalid 1");
    }
    // 3.Check Password
    const checkPassword = bcrypt.compareSync(password, checkUser.password);
    if (!checkPassword) {
      createError(400, "Email or Password is Invalid 2");
    }
    // 4.Generate Token
    const payload = {
      id: checkUser.id,
      username: checkUser.username,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

    console.log(token);

    res.json({
      message: "Login successfully",
      payload: payload,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};
