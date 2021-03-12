import express from "express";

import { errorHandler, notFound } from "./middlewares";
import api from "./api";
import passport from "./auth/passport";
import { errors } from "celebrate";

import knex from "knex";
import { Model } from "objection";

import knexConfig from "../knexfile";

const connectionConfig = knexConfig["development"];

const connection = knex(connectionConfig);

Model.knex(connection);

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.get("/", (_, res) => {
  res.json({
    message: "welcome to the backed!!",
  });
});

app.use("/api", api);
app.use((err, req, res, next) => {
  console.log(err);
  return res.status(404).json({ message: err });
});

// app.use(notFound);
// app.use(errorHandler);
// app.use(errors());

export default app;
