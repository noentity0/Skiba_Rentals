import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import passport from "passport";
import saveRedirectUrl from "../middleware.js";

import * as userController from "../controllers/users.js";

const router = express.Router();

router.route("/signup")
 .get(userController.renderSignupForm)
 .post(wrapAsync(userController.signup));

router.route("/login")
 .get(userController.renderLoginForm)
 .post(
    saveRedirectUrl,
    passport.authenticate("local",
        {failureRedirect:"/login",failureFlash:true}), // this is for login which passport handles
    userController.login);       // this controller handles what happens after login

    
// router.get("/signup",userController.renderSignupForm);

// router.post("/signup",wrapAsync(userController.signup));

// router.get("/login",userController.renderLoginForm);

// //here passport.authenticate() middleware for authenticating reqs
// router.post("/login",
//     saveRedirectUrl,
//     passport.authenticate("local",
//         {failureRedirect:"/login",failureFlash:true}), // this is for login which passport handles
//     userController.login);       // this controller handles what happens after login
    
router.get("/logout",userController.logout);

export default router;