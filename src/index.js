require('dotenv').config();

const app = require("./app");
const { connectDB, getDB, closeDB } = require("./db/mongo");

(async () => {
  await connectDB();
  app.listen(3000, () => console.log("Server started"));
})();

process.on("SIGINT", async () => {
  console.log("Shutting down...");
  await closeDB();
  process.exit(0);
});