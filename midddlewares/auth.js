import { User } from "../models/user.js";

import jwt from "jsonwebtoken";

export const isAuhenticated = async (req,res,next)=>{

    const { token } = req.cookies;
    //  console.log(token);

     if(!token) return res.status(400).json({
        success:false,
        message:"Login first" ,
    });
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);
    next();
};