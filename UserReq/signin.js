


async function signin(userDB){
    if(!req.body) return res.sendStatus(400);
      
    const userLogin = req.body.name;
    const userPassword = req.body.password;

    //check('name', "Имя пользователя не может быть пустым").notEmpty(),
    //check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4, max:10})

    //let user = null;

    newToken = Math.random() * (1000000 - 10000) + 10000;


    //
    try {
      const user = await userDB.find({$and : [{login: userLogin}, {password: userPassword}]});

      if (isEmpty(user)){
        console.log('ErrorUser1');
        throw new Error(404);
      } else {
        try{
          const userNew = await userDB.updateOne({login: userLogin, password: userPassword}, 
            {login: userLogin, password: userPassword, token: newToken});
            
          // отправляем пользователя
          console.log('userNew');
          userToken = {token: newToken};
            console.log(userToken);

            return userToken;
        }
        catch {
           //res.status(404).send();
           console.log('ErrorUser2');
           throw new Error(404);
        } 
      }
          
  }catch(err) {
      console.log('ErrorUser3');
      throw new Error(404);
  }
}

module.exports = signin;
//export { signin };