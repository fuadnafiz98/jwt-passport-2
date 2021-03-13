require("dotenv").config();

module.exports = {
  development: {
    client: "mysql",
    connection: {
      database: process.env.MARIADB_DATABASE || "mariadb",
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
