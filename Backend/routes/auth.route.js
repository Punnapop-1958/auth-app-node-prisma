import express from "express";
const router = express.Router();

import { register, login } from "../controllers/auth.controller.js";
import { loginSchema, registerSchema, validate } from "../utils/validate.js";

// router.post("/register", (req, res) => {
//   res.json({ message: "Register done!" });
// });

router.post("/register", validate(registerSchema), register);

// router.post("/login", (req, res) => {
//   res.json({ message: "Login done!" });
// });

router.post("/login", validate(loginSchema), login);

export default router;
