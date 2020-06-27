//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");


const app = express();
app.set ('view engine','ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.use(session({
  secret: "StarkEvanas.",
  resave: false,
  saveUninitiated: false
}));

app.use(passport.initialize());
app.use(passport.session());
//////////////////////////////mongo db databasse basic commands   /////////////////////////////////////////////////////

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser:true} );

const userSchema = new mongoose.Schema( {
  email: String,
  password: String

});
userSchema.plugin(passportLocalMongoose);

const User =new mongoose.model("User",userSchema);

//////////////////////////////mongo db databasse basic commands   /////////////////////////////////////////////////////

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/",function(req,res){
  res.render("home");
});

app.get("/register",function(req,res){
  res.render("register");
});

app.get("/login",function(req,res){
  res.render("login");
});

app.get("/explore",function(req,res){
  res.render("explore");
});
app.get("/pricetag",function(req,res){
  res.render("pricetag");
});
app.post("/pricetag",function(req,res){
  res.render("pricetag");
});




app.post("/register",function(req,res){
   User.register({username: req.body.username}, req.body.password ,function(err,user){
  if(err){
    console.log(err);
    res.redirect("/login");
  } else {
passport.authenticate("local")(req,res, function(){
  res.redirect("/explore");
});


  }
   });
  });


app.post("/login",function(req,res){
const user = new User({
  username : req.body.username,
  password : req.body.password
});

req.login(user, function(err){
  if(err){
    console.log(err);
  }else{
    passport.authenticate("local")(req,res,function(){
      res.redirect("/explore");
    });
  }
});
});

app.get("/logout",function(req,res){
  req.logout();
  res.redirect("/");
});
app.get("/submit",function(req,res){
  if(req.isAuthenticated()){
    res.render("submit");
  }
  else{
    res.redirect("/login");
  }
});






app.listen(3000,function(){
  console.log("server started on port 3000");
});
