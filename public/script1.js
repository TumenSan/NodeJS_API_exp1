
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
        const user = await response.json();
        //let rows = document.querySelector("tbody");
        let TokenLabel = document.createElement('div');
        console.log(user.token);
        TokenLabel.innerHTML = user.token;
        document.body.append(TokenLabel);

        console.log(user);

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
    }
}

function mePre() {
    const form = document.forms["userForm"];
    const token = form.elements["token"].value;
    console.log(token);
    MeUsers(token);
}

async function MeUsers(token) {
    // отправляет запрос и получаем ответ
    const response = await fetch("/me/" + token, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    // если запрос прошел нормально
    if (response.ok === true) {
        // получаем данные
        const users = await response.json();
        //let rows = document.querySelector("tbody"); 
        console.log(users);
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
    }
}

GetUsers();


// Получение пользователя
async function GetUser(token) {
    // отправляет запрос и получаем ответ
    const response = await fetch("/users/" + token, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    // если запрос прошел нормально
    if (response.ok === true) {
        // получаем данные
        const user = await response.json();
        //let rows = document.querySelector("tbody"); 
        console.log(user);
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