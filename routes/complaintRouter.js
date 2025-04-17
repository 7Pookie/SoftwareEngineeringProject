const express = require("express");
const router = express.Router();
const complaintModel = require("../models/complaint-model")
const authMiddleWare = require("../middlewares/isLoggedIn");

router.get("/" ,authMiddleWare, async(req , res) => {
    const userEmail = req.user.email;
    const temp = await complaintModel.find({email: userEmail})
    console.log(temp)
    res.send(temp)
})


router.get("/getAll" , async(req , res) => {
    const temp = await complaintModel.find({})
    console.log(temp)
    res.send(temp)
})


router.post("/update", async (req, res) => {
    try {
        const { parcelOrderNumber } = req.body;

        const updation = await complaintModel.findOneAndUpdate(
            { parcelOrderNumber: parcelOrderNumber },
            { resolved: true },
            { new: true } // optional: returns the updated document
        );

        if (!updation) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        res.json({ message: "Complaint updated successfully", complaint: updation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.post("/createComplaint" ,authMiddleWare, async(req , res) => {
    const complaintForm = req.body;
    const temp = await complaintModel.create({
        email: req.user.email,
        parcelOrderNumber: complaintForm.orderNumber,
        description: complaintForm.description,
        resolved: false
    })
    res.send(temp);
});

module.exports = router;
