import express from "express";

import {
  
   
     getMyProfile, 
     login, 
     logout, 
     register, 
    
    } from "../controllers/user.js";
import { isAuhenticated } from "../midddlewares/auth.js";

// import { User } from "../models/user.js";

const router = express.Router();

// router.get("/all",getAllUsers);

 router.post("/new",register);

//  router.get("/userid/special",specialFunc);

router.post("/login",login);
router.get("/logout",logout);
router.get("/me",isAuhenticated,getMyProfile);

 //1st method

//  router.route("/userid/:id")
//  .get(getMyProfile);

//  .put(updateUser)
//  .delete(deleteUser)


 // 2nd method that is commented


/*
  router.get("/userid/:id",getMyDetails);
 router.put("/userid/:id",updateUser);

 router.delete("/userid/:id",deleteUser);

*/



export default router;