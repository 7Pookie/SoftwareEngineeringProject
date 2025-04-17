const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");
const authMiddleWare = require("../middlewares/isLoggedIn");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

router.get("/" ,async(req , res) => {
    
    let decoded = jwt.verify(req.cookies.token , "Hello");
    const user = await ownerModel.findOne({email : decoded.email}).select("-password");
    const email = user.email;
    const data = await ownerModel.findOne({email});

    console.log(data)
    res.send(data)

})

router.post("/login" , async(req , res) => {
    let {email , password} = req.body;
    const userPrev = await ownerModel.findOne({email});
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


router.post("/create" , async(req , res) => {
    const user1 = await ownerModel.create({
        name: "Kranti Sambhav",
        email: "kranti@gmail.com",
        password: "12345"
    })
    console.log(user1);
    res.send(user1);
})

router.post("/register" , async(req , res) => {
    let {email , password , name} = req.body;

    const prevUser = await ownerModel.findOne({
        email: email
    })
    if(prevUser) return res.send("You already have an account. Please login.")

    bcrypt.genSalt(10 , function(err , salt){
        bcrypt.hash(password , salt , async(err, hash)    => {
            if(err){
                return res.send(err);
            }
            const user = await ownerModel.create({
                name: name,
                email: email,
                password: hash,
                id: req.body.id,
                mobileNumber: req.body.mobileNumber
            })

            let token = jwt.sign({email, userId: user._id} , "Hello" , {expiresIn: '2h'});
            res.cookie("token" , token);
            res.json({token});
        })
    })
});

module.exports = router;
