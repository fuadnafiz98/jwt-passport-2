import express from "express";
import { celebrate, Joi } from "celebrate";
import { signIn, signUp } from "./auth.controller";

const router = express.Router();

router.post(
  "/signup",
  celebrate({
    body: Joi.object({
      name: Joi.string().required(),
      password: Joi.string().required(),
      role: Joi.string().required(),
    }),
  }),
  async (req, res, next) => {
    try {
      const data = await signUp(req.body);
      res.json(data);
    } catch (err) {
      // throw new Error(
      //   `================== error at /signup ================\n
      //     ${err.message}`
      // );
      return next(err.message);
    }
  }
);

router.post(
  "/signin",
  celebrate({
    body: Joi.object({
      name: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  async (req, res, next) => {
    try {
      const data = await signIn(req.body);
      console.log(data);
      return res.json(data);
    } catch (err) {
      // throw new Error(
      //   `================== error at /signin ================\n
      //     ${err.message}`
      // );
      return next(err.message);
    }
  }
);

router.post("/signout", () => {});

export default router;
