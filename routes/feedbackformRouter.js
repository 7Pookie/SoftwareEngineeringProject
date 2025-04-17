const express = require("express");
const router = express.Router();
const feedbackModel = require("../models/feedback-model");
const authMiddleWare = require("../middlewares/isLoggedIn");

router.get("/" ,authMiddleWare, async(req , res) => {
    const data = await feedbackModel.find({});
    console.log(data)
    res.send(data);
})

router.post("/createFeedback" , async(req , res) => {
    const userFeedback = req.body;
    const user1 = await feedbackModel.create({
        description: userFeedback.description,
        parcelOrderNumber: userFeedback.parcelOrderNumber
    })
    console.log(user1);
    res.send(user1);
})

module.exports = router;


