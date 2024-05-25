const User = require("../models/user.js");

module.exports.renderSignupForm = (req,res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async(req,res) => {
    try{
        let {email,username,password} = req.body;
        const newUser = new User({email,username});
        let registeredUser = await User.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser,(err) => {
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to Wander Lust!");
            res.redirect("/listings");
        });
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req,res) => {
    res.render("users/login.ejs");
};

module.exports.login = async(req, res) => {
    req.flash("success","Welcome back to Wander Lust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next) => {
    req.logOut((err) => {
        if(err){
            return next();
        }
        req.flash("success","You are logged out!");
        res.redirect('/listings');
    });
};