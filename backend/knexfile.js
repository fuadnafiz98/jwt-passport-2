require("dotenv").config();

module.exports = {
  development: {
    client: "mysql",
    connection: {
      database: process.env.MYSQL_DATABASE || "jwt",
      user: "admin",
      password: "password",
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};
