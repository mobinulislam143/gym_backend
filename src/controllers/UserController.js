const UserModel = require('../models/UserModel');
const generatetokenSetCookie = require('../utils/generateToken');

// C=Create

exports.signUp = async (req, res) => {
    try {
        const { email, password, full_name,confirmPassword, role} = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ status: "Password doesn't match" });
        }

        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ status: "email already exists" });
        }

        const newUser = new UserModel({
            email,
            full_name,
            password,
            role
           
        });
        if(newUser){
            generatetokenSetCookie(newUser._id, res)
            await newUser.save();

            res.status(200).json({ status: "success", data: newUser });
        }else{
            
            res.status(400).json({ status: "Invalid user data." });
        }      
    } catch (e) {
        res.status(400).json({ status: "fail", data: e.toString() });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by username
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ status: 'failed', message: 'User not found' });
        }

        // Check if password matches
        if (user.password !== password) {
            return res.status(400).json({ status: 'failed', message: 'Password does not match' });
        }

        // Generate and set token cookie, and capture the token
        const token = generatetokenSetCookie(user._id, res);

        console.log(token)
        res.status(200).json({ 
            status: "success", 
            data: user, 
          
        });
    } catch (e) {
        res.status(400).json({ status: "fail", data: e.toString() });
    }
};

exports.test= (req, res) => {
    try {
      
       
        res.status(200).json({status:"success",data:"server is healthy"})
    }catch (e) {
        res.status(400).json({status:"fail",data:e.toString()})
    }
    
}
exports.logout= (req, res) => {
    try {
       res.cookie('token', "", {maxAge:0})
       
        res.status(200).json({status:"success",data:"Logout successfully."})
    }catch (e) {
        res.status(400).json({status:"fail",data:e.toString()})
    }
    
}
exports.Users= async(req, res) => {
    try {
       let loggedInUserId  = req.user._id
       console.log(res.cookie('token'))

       const fileredUser = await UserModel.find({ _id: { $ne: loggedInUserId } }).select("-password")
        res.status(200).json({status:"success",data:fileredUser})
    }catch (e) {
        res.status(400).json({status:"fail",data:e.toString()})
    }
    
}
