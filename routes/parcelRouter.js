const express = require("express");
const router = express.Router();
const parcelModel = require("../models/parcel-model")
const authMiddleWare = require("../middlewares/isLoggedIn");

router.get("/" ,authMiddleWare, async(req , res) => {
    const tempData = req.user;
    const email = tempData.email;
    const temp = await parcelModel.find({email});
    console.log(temp)
    res.send(temp)
})

router.get("/getAll" ,async(req , res) => {
    const temp = await parcelModel.find({});
    console.log(temp)
    res.send(temp)
})

router.get("/getById/:parcelOrderNumber",  async (req, res) => {
    const { parcelOrderNumber } = req.params;
    const temp = await parcelModel.find({ parcelOrderNumber });
    res.send(temp);
});


router.post("/createParcel" ,authMiddleWare, async(req , res) => {
    const formData = req.body;
   const parcel = await parcelModel.create({
    email: req.user.email,
    parcelOrderNumber: formData.orderNumber,
    receptionUser: formData.receptionUser,
    receptionStaff: formData.receptionStaff,
    description: formData.description,
    dateOfDeleivery: formData.date,
    otp: formData.otp,
    serviceName: formData.serviceName,
    receptionUserByStaff: formData.receptionUserByStaff
   })
   console.log(parcel);
   res.send(parcel);
})


router.post("/updateStatus", async (req, res) => {
    try {
        const { parcelOrderNumber } = req.body;
        const updation = await parcelModel.findOneAndUpdate(
            { parcelOrderNumber: parcelOrderNumber },
            { receptionUser: true },
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

router.post("/updateStatusStaff", async (req, res) => {
    try {
        const { parcelOrderNumber } = req.body;
        const updation = await parcelModel.findOneAndUpdate(
            { parcelOrderNumber: parcelOrderNumber },
            { receptionStaff: true },
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


router.post("/updateStatusStaffUser", async (req, res) => {
    try {
        const { parcelOrderNumber } = req.body;
        const updation = await parcelModel.findOneAndUpdate(
            { parcelOrderNumber: parcelOrderNumber },
            { receptionUserByStaff: true },
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

module.exports = router;
