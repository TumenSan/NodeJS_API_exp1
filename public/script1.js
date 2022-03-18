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



async function signup() {
    // отправляет запрос и получаем ответ
    const response = await fetch("/signup", {
        method: "POST",
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



function row(user) {

    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", user.id);

    const idTd = document.createElement("td");
    idTd.append(user.id);
    tr.append(idTd);

    const nameTd = document.createElement("td");
    nameTd.append(user.name);
    tr.append(nameTd);

    const ageTd = document.createElement("td");
    ageTd.append(user.age);
    tr.append(ageTd);
      
    const linksTd = document.createElement("td");

    const editLink = document.createElement("a");
    editLink.setAttribute("data-id", user.id);
    editLink.setAttribute("style", "cursor:pointer;padding:15px;");
    editLink.append("Изменить");
    editLink.addEventListener("click", e => {

        e.preventDefault();
        GetUser(user.id);
    });
    linksTd.append(editLink);

    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-id", user.id);
    removeLink.setAttribute("style", "cursor:pointer;padding:15px;");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {

        e.preventDefault();
        DeleteUser(user.id);
    });

    linksTd.append(removeLink);
    tr.appendChild(linksTd);

    return tr;
}