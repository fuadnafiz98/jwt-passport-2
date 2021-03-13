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
      res.cookie("token", data.token, {
        httpOnly: true,
      });
      return res.json({
        data: "user created successfully",
      });
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
      res.cookie("token", data.token, {
        httpOnly: true,
      });
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

router.post("/signout", async (req, res, next) => {
  if (req.cookies.token) {
    res.clearCookie("token", {
      httpOnly: true,
    });
  }
  return res.json({
    data: "user logged out successfully",
  });
});

export default router;
