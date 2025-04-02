const express = require("express");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

//GET /api/orders/my-order
//Get logged in user's orders
//access Private

router.get("/my-orders", protect, async (req, res) => {
  try {
    //Find orders for the authenticated user
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    }); //sort bby most recent order
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//GET /api/orders/:id
//Get order details by ID
//access PRivate

router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    //return the full order details
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

module.exports = router;
