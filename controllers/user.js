import { User } from "../models/user.js";
import bcrypt from "bcrypt";

import {sendCookie} from "../utils/features.js";
import ErrorHandler from "../midddlewares/error.js";


// export const getAllUsers = async(req,res)=>{

//     // const users = await User.find({});
//     // console.log(req.query);
//     // const keyword = req.query.keyword;
//     // console.log(keyword);
 
//     //  res.json({
//     //      success:true,
//     //      users,
//     //  })


//  };
 
 export const login =async(req,res,next)=>{
 try {
   const {email,password} = req.body;
   const user = await User.findOne({email}).select("+password");
 
   if(!user) return next(new ErrorHandler("Invalid Email or Password",400));
 
 //   if(!user) return res.status(400).json({
 //     success:false,
 //     message:"invalid email or password ",
 // });
   const isMatch = await bcrypt.compare(password, user.password);
 
   if(!isMatch) return next(new ErrorHandler("Invalid Email or Password",400));
 //   if(!isMatch) return res.status(400).json({
 //     success:false,
 //     message:"invalid email or password ",
 // });
 
 sendCookie(user,res,`welcome back,${user.name}`,200) 
 } catch (error) {
   next(error)
 }
  
 };


 export const register = async(req,res)=>{
  try {
       // const {name,email,password}= req.body;

    
    
    //    await User.create({
    //     name,
    //     email,
    //     password
    // });
 
    //  res.status(201).cookie("tempi","lol").json({
    //      success:true,
    //      message:"registered successfully",
    //  })

    const {name,email,password} = req.body;
    let user = await User.findOne({email});

    if(user) return next(new ErrorHandler("User already exist",400));
   //  if(user) return res.status(400).json({
   //      success:false,
   //      message:"User exist ",
   //  });
    const hashedPassword = await bcrypt.hash(password,10);
    user = await User.create({name,email,password: hashedPassword});
    sendCookie(user,res,"Registered successfully",201);
  } catch (error) {
    next(error)
  }

 };


//  export const specialFunc =async(req,res)=>{
   
//     res.json({
//      success:true,
//     message:"good good good"
//     })
 
//  }



 export const getMyProfile= (req,res)=>{
//     const {id} = req.params;
//   const user= await User.findById(id)
// // console.log(req.params);
//    res.json({
//     success:true,
//     user,
//    })
     res.status(200).json({
        success:true,
        user:req.user,
     })
};

export const logout = (req,res)=>{
         res
         .status(200)
         .cookie("token", "" ,{
            expires:  new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Development" ? "lax": "none",
            secure: process.env.NODE_ENV === "Development" ? false:true,
          })
         .json({
            success:true,
            user:req.user,
         })
    };


// export const updateUser= async(req,res)=>{
//     const {id} = req.params;
//   const user= await User.findById(id)
// // console.log(req.params);
//    res.json({
//     success:true,
//      message:"updated"
//    })

// }


// export const deleteUser= async(req,res)=>{
//     const {id} = req.params;
//   const user= await User.findById(id)

// //   await user.remove()
// // console.log(req.params);
//    res.json({
//     success:true,
//     message:"deleted"
//    })

// }