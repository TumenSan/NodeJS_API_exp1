const signin = require( './UserReq/signin' );

const express = require("express");
const fs = require("fs");
require('dotenv').config();
const mongoose = require("mongoose");

const asyncHandler = require('express-async-handler'); //

const { check, validationResult } = require('express-validator'); //

const db = ''

//
//const authRouter = require('./authRouter')
//

mongoose
    .connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((res) => console.log('Connected to DB'))
    .catch((error) => console.log(error));

    


const app = express();

//
//app.use(express.json())
//app.use("/auth", authRouter)
//

//
const Schema = mongoose.Schema;


// установка схемы
const userScheme = new Schema({
    login: String,
    password: String,
    token: String
});

const User = mongoose.model("users", userScheme);


const jsonParser = express.json();

app.use(express.static(__dirname + "/public"));


app.post("/signin", jsonParser, async function(req, res, next){
    if(!req.body) return res.sendStatus(400);
    try{
        const userToken = await signin(User);
        // отправляем пользователя

        res.send(userToken);
    }
    catch {
        res.status(404).send();
    }
});


app.post("/signup", jsonParser, async function(req, res, next){
    if(!req.body) return res.sendStatus(400);
      
    const userLogin = req.body.name;
    const userPassword = req.body.password;

    //let user1 = {login: userLogin, password: userPassword};
    //let user = null;

    try {
        const user = await User.find({$or : [{login: userLogin}, {password: userPassword}]});

        if (!(isEmpty(user))){
            return res.status(404).send();
        } else {
            const userBase = new User({
                login: userLogin,
                password: userPassword,
                token: ""
            });
            //user = {login: userLogin, password: userPassword};

            await userBase.save();
            console.log(user);
            res.send(user);
        }
            
    }catch(err) {
        

        console.log(err);
        res.status(404).send();
    }

});


//!!!!!!!!!!
/*
app.post('/user/:id', jsonParser, function (req, res, next) {
    console.log('ID:', req.params.id);
    next();
  }, function (req, res, next) {
    res.send('User Info');
  });
  */

  //!!!!!!!


app.get("/me/:token", function(req, res){
    const token = req.params.token; // получаем id

    let user = null;


    User.findOne({token: token}, function(err, doc){
        //mongoose.disconnect();
         
        try {
            user = doc;
            console.log(doc);
            console.log(doc.login);
            res.send(user);
             
        }catch(err) {
            console.log(err);
            res.status(404).send();
        }
    });

});

app.get("/users", function(req, res){
       
    let user = null;
    
    User.find({}, function(err, doc){
        //mongoose.disconnect();
         
        if(err) return console.log(err);
         
        user = doc;
        //console.log(user);
        console.log(doc.login);

        // отправляем пользователя
        if(user){
            res.send(user);
        }
        else{
            res.status(404).send();
        }
    });
    
});

app.get("/users/:token", function(req, res){
    const token = req.params.token; // получаем id

    let user = null;
    
    User.findOne({token: token}, function(err, doc){
        //mongoose.disconnect();
         

        try {
            user = doc;
            console.log(doc);
            console.log(doc.login);
            res.send(user);
             
        }catch(err) {
            console.log(err);
            res.status(404).send();
        }

    });
    
});



function isEmpty(obj) {
  for (let key in obj) {
    // если тело цикла начнет выполняться - значит в объекте есть свойства
    return false;
  }
  return true;
}



app.listen(process.env.PORT, function(){
    console.log("Сервер ожидает подключения...");
});