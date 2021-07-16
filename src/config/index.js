const dotenv = require("dotenv");

const envFound = dotenv.config();
if (!envFound) {
  throw new Error("env not found");
}

process.env.NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
  port: process.env.PORT,
  log: {
    level: process.env.LOG_LEVEL,
  },
  swagger: {
    path: "/documentation",
  },
  db: {
    host: process.env.HOST,
  },
};
