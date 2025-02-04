const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");


const signup =async (req,res)=>{
try {
   const {email ,password } = req.body;
   const user =await UserModel.findOne({email});
   if(user){
      return res.status(409)
      .json({message:'User is already exits,you can login',success:false});
   }
   const userModel =new UserModel({email,password});
   userModel.password = await bcrypt.hash(password,10);
   await userModel.save();
   res.status(201)
   .json({
      message:'signup sucessfuly',
      success:true
   })
} catch (error) {
   res.status(500)
   .json({
      message:'internal server erro',
      success:false
   })
}
}


const login = async (req, res) => {
   try {
     const { email, password } = req.body;
     const user = await UserModel.findOne({ email });
     
     const errorMsg = "Authentication failed. Email or password is incorrect.";
 
     if (!user) {
       return res.status(403).json({ message: errorMsg, success: false });
     }
 
     const isPassEqual = await bcrypt.compare(password, user.password);
 
     if (!isPassEqual) {
       return res.status(403).json({ message: errorMsg, success: false });
     }
 
     const jwtToken = jwt.sign(
       { email: user.email, _id: user._id },
       process.env.JWT_SECRET,
       { expiresIn: '24h' }
     );
 
     res.status(200).json({
       message: 'Login successful',
       success: true,
       jwtToken,
       email,
     });
   } catch (error) {
     console.error('Error during login:', error);
     res.status(500).json({
       message: 'Internal server error',
       success: false
     });
   }
 }
 

 
module.exports ={
   signup,
   login
}