const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    parcel: {
        type: Array,
        default: []
    },
    complaints: {
        type: Array,
        default: []
    },
    rollNumber: String,
    course: String,
    major: String,
    hostel: String,
    gender: String,
    mobileNumber: String
})

module.exports = mongoose.model("user" , userSchema);
