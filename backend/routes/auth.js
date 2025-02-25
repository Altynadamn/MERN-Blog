const express=require('express')
const router=express.Router()
const User=require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


//REGISTER
router.post("/register",async(req,res)=>{
    try{
        const {username,email,password}=req.body
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hashSync(password,salt)
        const newUser=new User({username,email,password:hashedPassword})
        const savedUser=await newUser.save()
        res.status(200).json(savedUser)

    }
    catch(err){
        res.status(500).json(err)
    }

})



router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user in database
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Check password (assuming bcrypt for hashing)
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate token
        const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
            expiresIn: "7d",
        });

        // ✅ Set cookie correctly inside route handler
        res.cookie("token", token, {
            httpOnly: true,
            secure: true, // Only use in production
            sameSite: "None",
        });

        res.status(200).json({ message: "Login successful", user });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err });
    }
});



//LOGOUT
router.get("/logout",async (req,res)=>{
    try{
        res.clearCookie("token",{sameSite:"none",secure:true}).status(200).send("User logged out successfully!")

    }
    catch(err){
        res.status(500).json(err)
    }
})

router.get("/refetch", (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "No token provided" }); // Handle missing token
    }

    jwt.verify(token, process.env.SECRET, {}, async (err, data) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" }); // Use 403 for invalid token
        }
        res.status(200).json(data);
    });
});



module.exports=router
