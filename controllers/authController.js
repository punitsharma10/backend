const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const User=require("../models/User");

exports.signup=async(req,res)=>{
 try{
  const { name, email, password }=req.body;

  const existingUser=await User.findOne({ email });
  if(existingUser)
  {
   return res.status(409).json({ message: "email exists." });
  }

  const hashedPassword=await bcrypt.hash(password, 10);

  const nUser=new User({ name, email, password: hashedPassword });

  await nUser.save();
  const token=jwt.sign({ userId: nUser._id },"masai-school",
  {
   expiresIn: "1h",
  });

  res.status(201).json({
   message: "User created successfully",
  });
 }catch(error){
  res.status(500).json({ error: error.message });
 }
};



exports.login=async(req,res)=>{
 try {
  const {email,password}=req.body;
  const user=await User.findOne({ email });
  if(!user)
  {
   return res
    .status(401)
    .json({ message:"User not found"});
  }

  const isPasswordValid=await bcrypt.compare(password, user.password);
  if(!isPasswordValid)
  {
   return res
    .status(401)
    .json({ message: "invalid password" });
  }

  const token=jwt.sign({ userId: user._id }, "masai-school", { expiresIn: "1h" });
  res.json({username:user.name, userid:user._id, token });
 } catch (error){
  res.status(500).json({ error: error.message });
 }
};

