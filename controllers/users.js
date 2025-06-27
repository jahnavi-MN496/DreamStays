const User = require("../models/user.js");

module.exports.renderLoginForm = (req,res) => {
    res.render("users/login.ejs", { hideNavbar: true, hideDarkToggle: true });
}

module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs", { hideNavbar: true, hideDarkToggle: true });
}

module.exports.signup = async(req,res) =>{
    try{
        let {username,email,password} = req.body;
        const newUser = new User({username: email, email});
        const registeredUser = await User.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        res.redirect("/listings");
        })
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

module.exports.login = async(req,res)=>{
    req.flash("success","Welocme back to wnaderlust !! You are logged in");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout = (req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Successfully logged out");
        res.redirect("/listings");
    })
}