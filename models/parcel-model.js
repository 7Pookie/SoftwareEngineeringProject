const mongoose = require("mongoose");

const parcelSchema = mongoose.Schema({
    email: String,
    serviceName: String,
    parcelOrderNumber: String,
    receptionUser: {
        type: Boolean,
        default: false
    },
    receptionStaff: {
        type: Boolean,
        default: false
    },
    receptionUserByStaff: {
        type: Boolean,
        default: false
    },
    description: String,
    dateOfDeleivery: String,
    otp: String,
})

module.exports = mongoose.model("parcel" , parcelSchema);
