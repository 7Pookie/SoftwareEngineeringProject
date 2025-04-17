const mongoose = require("mongoose");


const ownerSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    id: String,
    mobileNumber: String
})

module.exports = mongoose.model("owner" , ownerSchema);
