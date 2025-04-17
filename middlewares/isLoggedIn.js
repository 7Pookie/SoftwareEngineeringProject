const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async function (req, res, next){
    if(!req.cookies.token){
        return res.redirect("/")
    }
    let decoded = jwt.verify(req.cookies.token , "Hello");
    const user = await userModel.findOne({email : decoded.email}).select("-password");
    req.user = user;
    next();
}