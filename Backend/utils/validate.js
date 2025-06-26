import { object, string } from "yup";

export const registerSchema = object({
  email: string().email().required(),
  username: string().min(8),
  password: string().min(8),
});
export const loginSchema = object({
  email: string().email().required(),
  username: string().min(8),
  password: string().min(8),
});

export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errValidate = error.errors.join(", ");
    console.log(errValidate);
    const err = new Error(errValidate);
    next(err);
  }
};
