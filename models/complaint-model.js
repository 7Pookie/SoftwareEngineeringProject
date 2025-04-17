const mongoose = require("mongoose");


const complaintSchema = mongoose.Schema({
    parcelOrderNumber: String,
    description: String,
    email: String,
    resolved: Boolean
})

module.exports = mongoose.model("complaint" , complaintSchema);
