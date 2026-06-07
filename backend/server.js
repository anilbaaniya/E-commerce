import { app } from "./app.js";
import dotenv from "dotenv";

process.on("uncaughtException", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

import { connectDatabase } from "./db.js";
dotenv.config({ path: "./config.env" });

connectDatabase();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTIONS! Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
