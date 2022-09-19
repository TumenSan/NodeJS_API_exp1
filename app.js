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

const Schema = mongoose.Schema;


// установка схемы
const userScheme = new Schema({
    login: String,
    password: String,
    token: String
});

const bookScheme = new Schema({
    login: String,
    password: String,
    token: String
});

const User = mongoose.model("users", userScheme);
const Book = mongoose.model("books", userScheme);

const jsonParser = express.json();

app.use(express.static(__dirname + "/public"));


app.post("/signin", jsonParser, async function(req, res, next){
    if(!req.body) return res.sendStatus(400);
    try{
        console.log('work');
        const userToken = await signin(req, User);
        // отправляем пользователя

        res.send(userToken);
    }
    catch(error) {
        console.log('no work', error);
        res.status(404).send();
    }
});

app.delete("/user", jsonParser, async function(req, res, next){
    if(!req.body) return res.sendStatus(400);
    try{
        console.log('work');

        const token = req.params.token;

        User.deleteOne({token: token});

        res.send(token);
    }
    catch(error) {
        console.log('no work', error);
        res.status(500).send();
    }
});

app.put("/user", jsonParser, async function(req, res, next){
    if(!req.body) return res.sendStatus(400);
    try{
        console.log('work');

        const token = req.params.token;

        User.findByIdAndUpdate({token},{"name": "David"}, function(err, result) {
            if (err) {
                console.log('Error updating user: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(user);
            }
        });

        res.send(token);
    }
    catch(error) {
        console.log('no work', error);
        res.status(500).send();
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


app.post("/me", function(req, res){
    if(!req.body) return res.sendStatus(400);

    const token = req.body.token; // получаем id

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

app.post("/users", function(req, res){
    if(!req.body) return res.sendStatus(400);

    const token = req.body.token; // получаем id
    
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

app.get("/books", function(req, res){
    const book = req.params.book; // получаем id
    
    Book.find({}, function(err, doc){
        //mongoose.disconnect();
         
        if(err) return console.log(err);
         
        book = doc;

        console.log(doc.login);

        if(book){
            res.send(book);
        }
        else{
            res.status(404).send();
        }
    });
    
});

app.post("/books", jsonParser, async function(req, res, next){
    if(!req.body) return res.sendStatus(400);
      
    const book = req.body.book;
    const author = req.body.author;

    try {
        const book = await Book.find({$or : [{book: book}, {author: author}]});

        if (!(isEmpty(book))){
            return res.status(404).send();
        } else {
            const bookBase = new User({
                book: book,
                author: author,
                token: ""
            });

            await bookBase.save();
            console.log(book);
            res.send(book);
        }
            
    }catch(err) {    

        console.log(err);
        res.status(404).send();
    }

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
