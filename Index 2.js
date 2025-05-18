import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/connection.js";
dotenv.config({
  path: "./.env",
});

const port = process.env.port;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((e) => {
    console.log("MongoDB connection error", e);
  });
