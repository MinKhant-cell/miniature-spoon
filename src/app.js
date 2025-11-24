const express = require("express");
const app = express();
const orderRoutes = require("./routes/order.routes");

app.use(express.json());
app.use("/orders", orderRoutes);
app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

module.exports = app;
