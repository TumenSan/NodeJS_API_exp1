
const express = require("express");
const fs = require("fs");
require('dotenv').config();
const mongoose = require("mongoose");

const db = ''

mongoose
    .connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((res) => console.log('Connected to DB'))
    .catch((error) => console.log(error));

    


const app = express();
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

const filePath = "bonus.json";



app.post("/signin", jsonParser, function(req, res){
    if(!req.body) return res.sendStatus(400);
      
    const userLogin = req.body.name;
    const userPassword = req.body.password;

    let user = null;

    newToken = Math.random() * (1000000 - 10000) + 10000;

    
    User.updateOne({login: userLogin, password: userPassword}, 
        {login: userLogin, password: userPassword, token: newToken}, function(err, docs){
        //docs.token = newToken;
        //mongoose.disconnect();
         
        if(err) return console.log(err);
         
        user = {login: userLogin, password: userPassword, token: newToken};

        // отправляем пользователя
        if(user){
            console.log(user);
            res.send(user);
        }
        else{
            res.status(404).send();
        }
    });
    
});



app.post("/signup", jsonParser, function(req, res){
    if(!req.body) return res.sendStatus(400);
      
    const userLogin = req.body.name;
    const userPassword = req.body.password;

    let user = {login: userLogin, password: userPassword};


    const userBase = new User({
        login: userLogin,
        password: userPassword,
        token: ""
    });
    
    userBase.save(function(err){
        //mongoose.disconnect();  // отключение от базы данных
        
        if(err) return console.log(err);
        console.log("Сохранен объект", user);
    });
    //


    res.send(user);
});

app.get("/me/:token", function(req, res){
    const token = req.params.token; // получаем id

    let user = null;


    User.findOne({token: token}, function(err, doc){
        //mongoose.disconnect();
         
        if(err) return console.log(err);
         
        user = doc;
        console.log(doc);
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
         
        if(err) return console.log(err);
         
        user = doc;
        console.log(doc);
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

app.listen(process.env.PORT, function(){
    console.log("Сервер ожидает подключения...");
});