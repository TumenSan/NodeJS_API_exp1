/*
async function CreateUser(userName, userAge) {

    const response = await fetch("signup", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            name: userName,
            age: parseInt(userAge, 10)
        })
    });
    if (response.ok === true) {
        const user = await response.json();
        reset();
        document.querySelector("tbody").append(row(user));
    }
}
*/


async function CreateUser(userAge) {

    const response = await fetch("users", {
        method: "GET",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            age: parseInt(userAge, 10)
        })
    });
    if (response.ok === true) {
        const user = await response.json();
    }
}

//var sendButton = document.userForm.NewUser;
//sendButton.addEventListener("click", CreateUser(123));



function CreateUser1(userAge) {

    console.log(userAge);
}

//var sendButton = document.userForm.NewUser1;
//sendButton.addEventListener("click", CreateUser1(12345));

function signinPre() {
    
    const form = document.forms["userForm"];
    const name = form.elements["name"].value;
    const password = form.elements["password"].value;
    console.log(name);
    console.log(password);
    signin(name, password);
}

async function signin(userName, userPassword) {
    // отправляет запрос и получаем ответ
    const response = await fetch("/signin", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json"},
        body: JSON.stringify({
            name: userName,
            password: userPassword
        })
    });
    // если запрос прошел нормально
    if (response.ok === true) {
        // получаем данные
        const users = await response.json();
        //let rows = document.querySelector("tbody"); 
        console.log(users);
        //users.forEach(user => {
            // добавляем полученные элементы в таблицу
            //rows.append(row(user));
            //console.log(user);
        //});
    }
}


async function signup(userName, userPassword) {
    // отправляет запрос и получаем ответ
    const response = await fetch("/signup", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json"},
        body: JSON.stringify({
            name: userName,
            password: userPassword
        })
    });
    // если запрос прошел нормально
    if (response.ok === true) {
        // получаем данные
        const users = await response.json();

        console.log(users);
        //users.forEach(user => {
            // добавляем полученные элементы в таблицу
            //rows.append(row(user));
            //console.log(user);
        //});
    }
}


async function MeUsers() {
    // отправляет запрос и получаем ответ
    const response = await fetch("/me", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    // если запрос прошел нормально
    if (response.ok === true) {
        // получаем данные
        const users = await response.json();
        //let rows = document.querySelector("tbody"); 
        console.log(users);
        //users.forEach(user => {
            // добавляем полученные элементы в таблицу
            //rows.append(row(user));
            //console.log(user);
        //});
    }
}

// Получение всех пользователей
async function GetUsers() {
    // отправляет запрос и получаем ответ
    const response = await fetch("/users", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    // если запрос прошел нормально
    if (response.ok === true) {
        // получаем данные
        const users = await response.json();
        //let rows = document.querySelector("tbody"); 
        console.log(users);
        //users.forEach(user => {
            // добавляем полученные элементы в таблицу
            //rows.append(row(user));
            //console.log(user);
        //});
    }
}

GetUsers();


// Получение пользователя
async function GetUser(id) {
    // отправляет запрос и получаем ответ
    const response = await fetch("/users/" + id, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    // если запрос прошел нормально
    if (response.ok === true) {
        // получаем данные
        const user = await response.json();
        //let rows = document.querySelector("tbody"); 
        console.log(user);
        //users.forEach(user => {
            // добавляем полученные элементы в таблицу
            //rows.append(row(user));
            //console.log(user);
        //});
    }
}


// отправка формы
document.forms["userForm"].addEventListener("submit", e => {
    e.preventDefault();
    const form = document.forms["userForm"];
    const name = form.elements["name"].value;
    const password = form.elements["password"].value;
    console.log(name);
    console.log(password);
    signup(name, password);
    //reset();
});

function reset(){
    const form = document.forms["userForm"];
    form.elements["name"].value = '';
    form.elements["password"].value = '';
}