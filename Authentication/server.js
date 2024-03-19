const express = require("express");
const fs = require("fs");
var bodyParser = require("body-parser");
const app = express();
const session=require('express-session');


app.use(session({
    secret:"this is my sceret bby",
    resave:false,
    saveUninitialized:false,
}));

/*
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
*/

app.use(express.urlencoded({extended:false}));
app.use(express.json());


const CheckUserLogin=(req,res,next)=>{
 if(req.session.user!=null){
    console.log(req.session.user);
    next();
  }else{
  res.sendFile(__dirname + "/Public/Login/login.html");
  }
}

app.get("/",CheckUserLogin,(req, res) => {
  res.sendFile(__dirname + "/Public/Home/home.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/Public/Login/login.html");
});

app.post("/login", (req, res) => {
  try {
    if (req.body.email == "" || req.body.password == "") {
      res.sendFile(__dirname + "/Public/Login/error.html");
    }
    var array = [];
    var content = fs.readFileSync("./data.txt", "utf8");
    if (content != "") {
      array = JSON.parse(content);
    } else {
      res.sendFile(__dirname + "/Public/Login/error.html");
    }

    var element = array.filter((element) => {
      if (
        element.email == req.body.email &&
        element.password == req.body.password
      ) {
        return element;
      }
    });
    if (element.length>0) {
       req.session.user=element[0].name;
       res.redirect("/");
    }else{
      res.sendFile(__dirname + "/Public/Login/invalidCrendential.html");
    }
  } catch (error) {
    console.log(error)
    res.sendFile(__dirname + "/Public/Login/error.html");
  }
});

app.get("/singup", (req, res) => {
  res.sendFile(__dirname + "/Public/Singup/singup.html");
});

app.post("/singup", (req, res) => {
  try {
    if (
      req.body.name == "" ||
      req.body.email == "" ||
      req.body.password == ""
    ) {
      res.sendFile(__dirname + "/Public/Singup/error.html");
    }
    var array = [];
    var content = fs.readFileSync("./data.txt", "utf8");
    if (content != "") {
      array = JSON.parse(content);
    } else {
      array = [];
    }
    let obj = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
     var element = array.filter((element) => {
      if (element.email == req.body.email ) {
        return element;
      }
    });
    if (element != null && element.length >0) {
        res.sendFile(__dirname + "/Public/Singup/error.html");
    }else{
        array.push(obj);
        content = JSON.stringify(array);
        fs.writeFileSync("./data.txt", content);
        res.redirect("/");
    }
  } catch (error) {
    console.log(error);
    res.sendFile(__dirname + "/Public/Singup/error.html");
  }
});

app.get("/logout",(req,res)=>{
  req.session.destroy();
  res.redirect('/login');
})

app.get("/user",CheckUserLogin,(req,res)=>{
  res.json({"name":req.session.user})
})

app.listen(3000, () => {
  console.log(`app is listen at 3000`);
});
