const mongoose = require("mongoose");
const dbrg = require("debug")("development:mongoose")
const config = require("config")

mongoose.connect(`${config.get("MONGODB_URI")}/parcel`)
.then(function(){
    dbrg("Connected")
})
.catch(function(err){
    dbrg(err)
})

module.exports = mongoose.connection;
