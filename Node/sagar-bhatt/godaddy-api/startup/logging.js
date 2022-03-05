require("dotenv").config();
const { createLogger, format, transports, error, info } = require("winston");
const {
  combine,
  colorize,
  timestamp,
  printf,
  errors,
  metadata,
  align,
  simple,
  prettyPrint,
  label,
  splat,
} = format;
require("winston-mongodb");

function handleLogging() {
  // *********** handling uncaughtException ***********
  process.on("uncaughtException", (err) => {
    serverLogging.error("There was an uncaught exception: ", err);
    serverLogging.on("finish", () => {
      process.exit(1);
    });
  });

  // *********** handling unhandledRejection ***********
  process.on("unhandledRejection", (err) => {
    throw err;
  });
}

// * levels :: error, warn, info, verbose, debug, silly
const serverLogging = createLogger({
  // *********** FORMAT LOG MESSAGE ***********
  format: combine(
    errors({ stack: true }),
    timestamp({ format: "DD-MMM-YYYY HH:mm:ss" }),
    printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`),
    metadata()
  ),
  transports: [
    // *********** FILE TRANSPORT :: create server error log file ***********
    new transports.Console({
      // * colorize whole output on console *
      format: combine(colorize({ all: true })),
    }),
    // *********** COMBINED LOGS ***********
    new transports.File({
      level: "debug",
      filename: "logs/debug.log",
      maxsize: 100000000,
      maxFiles: 10,
    }),
    // *********** ERROR LOGS ***********
    new transports.File({
      level: "error",
      filename: "logs/error.log",
      maxsize: 100000000,
      maxFiles: 10,
    }),
    // *********** MONGODB TRANSPORT :: create mongodb log collection ***********
    new transports.MongoDB({
      db: process.env.DATABASE,
      level: "error",
      storeHost: true,
      capped: true,
    }),
  ],
  exitOnError: false,
});

module.exports = { handleLogging, serverLogging };
