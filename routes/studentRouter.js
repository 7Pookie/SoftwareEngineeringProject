const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const authMiddleWare = require("../middlewares/isLoggedIn");

router.get("/" ,authMiddleWare, async(req , res) => {
    console.log(req.user)
    const email = req.user.email;
    const userData = await userModel.find({email})
    res.send(userData)
})

router.post("/login" , async(req , res) => {
    let {email , password} = req.body;
    const userPrev = await userModel.findOne({email});
    if(userPrev){
        bcrypt.compare(password , userPrev.password , function(err , result){
            if(result){
                let token = jwt.sign({email , userId: userPrev._id} , "Hello" , {expiresIn: '2h'});
                  // Setting the cookie with proper options
                  res.cookie("token", token, {
                    httpOnly: true,   // Prevent client-side access
                    secure: false,    // Set to true in production (requires HTTPS)
                    sameSite: "Lax"   // Prevent CSRF issues
                });
                res.send("Logged in")
            }else return res.send("Incorrect Password")
        })
    }else{
        res.send("User is not registered. Please register yourself")
    }
})


router.get("/check-cookie", (req, res) => {
    console.log("Cookies:", req.cookies);
    res.json(req.cookies);
});


router.get("/logout", (req, res) => {
    console.log("Cookies:", req.cookies);
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "None"
      });
      
    res.json(req.cookies);
});


router.post("/register" , async(req , res) => {
    let {email , password , name} = req.body;

    const prevUser = await userModel.findOne({
        email: email
    })
    if(prevUser) return res.send("You already have an account. Please login.")

    bcrypt.genSalt(10 , function(err , salt){
        bcrypt.hash(password , salt , async(err, hash)    => {
            if(err){
                return res.send(err);
            }
            const user = await userModel.create({
                name: name,
                email: email,
                password: hash,
                parcel: [],
                complaints: [],
                rollNumber: req.body.rollNumber,
                course: req.body.course,
                hostel: req.body.hostel,
                mobileNumber: req.body.mobileNumber
            })

            let token = jwt.sign({email, userId: user._id} , "Hello" , {expiresIn: '2h'});
            res.cookie("token" , token);
            res.send(token);
        })
    })
});





module.exports = router;
