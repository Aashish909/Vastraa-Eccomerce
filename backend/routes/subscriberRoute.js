const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");

//POST /api/subscribe
//Handle newsletter subscription
//access Public

router.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(404).json({ message: "Email is required" });
  }

  try {
    //Check if the email is already subscribed
    let subscriber = await Subscriber.findOne({ email });

    if (subscriber) {
      return res.status(400).json({ message: "Emial is already subscribed" });
    }

    //Create a new subscriber
    subscriber = new Subscriber({ email });
    await subscriber.save();
    res
      .status(201)
      .json({ message: "successfully subscribed to the newsletter!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
