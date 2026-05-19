import User from "../models/user.js";

export const renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
};

export const signup = async(req,res,next)=>{
    try{
        let {username, email,password} = req.body;
        const newUser= new User ({email,username});
        const registeredUser = await User.register(newUser,password); 
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
        req.flash("success","Welcome to Skiba Rentals!");
        res.redirect("/listings");
        })

    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
};

export const renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
};

export const login = async(req,res)=>{
     req.flash("success","Welcome back to Skiba Rentals!");
     res.redirect(res.locals.redirectUrl || "/listings");
}; 

export const logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","You are logged out!");
        res.redirect("/listings");
    })
};