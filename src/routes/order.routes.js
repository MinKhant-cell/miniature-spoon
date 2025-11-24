const express = require("express");
const router = express.Router();
const orderService = require("../services/OrderService");

router.post("/", (req, res) => {
  try {
    const { customerName, items } = req.body;
    const order = orderService.createOrder(customerName, items);
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.patch("/:id/status", (req, res) => {
  try {
    const order = orderService.updateStatus(req.params.id, req.body.status);
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
