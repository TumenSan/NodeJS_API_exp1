
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

    const content = fs.readFileSync(filePath, "utf8");
    const users = JSON.parse(content);
    let user = null;


    // находим в массиве пользователя по id
    for(var i=0; i<users.length; i++){
        if((users[i].login==userLogin) && (users[i].password==userPassword)){
            user = users[i];
            users[i].token = Math.random() * (1000000 - 10000) + 10000;
            break;
        }
    }


    
    User.updateOne({login: userLogin, password: userPassword}, 
        {login: userLogin, password: userPassword, token: users[i].token}, function(err, docs){
        docs.token = users[i].token; //бред
        //mongoose.disconnect();
         
        if(err) return console.log(err);
         
        console.log(docs);
    });
    //


    
    // отправляем пользователя
    if(user){
        console.log(user);
        res.send(user);
        console.log(users);

        data = JSON.stringify(users);
        // перезаписываем файл с новыми данными
        fs.writeFileSync("bonus.json", data);
    }
    else{
        res.status(404).send();
    }
});



app.post("/signup", jsonParser, function(req, res){
    if(!req.body) return res.sendStatus(400);
      
    const userLogin = req.body.name;
    const userPassword = req.body.password;
    //const userLogin = 'asd';
    //const userPassword = 'asdad';
    
    const content = fs.readFileSync(filePath,"utf8");
    const users = JSON.parse(content);
    
    //console.log(document.forms["userForm"].elements["name"].value);
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



    // находим максимальный id
    const id = Math.max.apply(Math,users.map(function(o){return o.id;}))
    // увеличиваем его на единицу
    user.id = id+1;
    // добавляем пользователя в массив
    users.push(user);
    data = JSON.stringify(users);
    // перезаписываем файл с новыми данными
    fs.writeFileSync("bonus.json", data);

    res.send(users);
});

app.get("/me/:token", function(req, res){
    const token = req.params.token; // получаем id
    const content = fs.readFileSync(filePath, "utf8");
    const users = JSON.parse(content);
    let user = null;
    // находим в массиве пользователя по id
    for(var i=0; i<users.length; i++){
        if(users[i].token==token){
            user = users[i];
            break;
        }
    }
    // отправляем пользователя
    if(user){
        res.send(user);
    }
    else{
        res.status(404).send();
    }
});

app.get("/users", function(req, res){
       
    const content = fs.readFileSync(filePath,"utf8");
    const users = JSON.parse(content);
    res.send(users);
});

app.get("/users/:token", function(req, res){
    const token = req.params.token; // получаем id
    const content = fs.readFileSync(filePath, "utf8");
    const users = JSON.parse(content);
    let user = null;
    // находим в массиве пользователя по id
    for(var i=0; i<users.length; i++){
        if(users[i].token==token){
            user = users[i];
            break;
        }
    }
    // отправляем пользователя
    if(user){
        res.send(user);
    }
    else{
        res.status(404).send();
    }
});

app.listen(process.env.PORT, function(){
    console.log("Сервер ожидает подключения...");
});