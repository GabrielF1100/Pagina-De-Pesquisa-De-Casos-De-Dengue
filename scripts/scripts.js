let userList = [];
let count = 1;

getCount();

function addCount() {
    let newCount = { id: count };
    localStorage.setItem('Count', JSON.stringify(newCount));
}

function addUser(firstName, lastName, email, phone, username, password) {
    const dataAtual = new Date();
    const dia = dataAtual.getDate().toString().padStart(2, '0'); // Dia do mês (1-31)
    const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0'); // Mês (0-11, janeiro é 0, então somamos 1)
    const ano = dataAtual.getFullYear();
    const data = `${dia}/${mes}/${ano}`;

    let newUser = {
        id: count++,
        date: data,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        username: username,
        password: password
    };
    userList.push(newUser);
    localStorage.setItem('userList', JSON.stringify(userList));
    renderUserList();
}

function deleteUser(userId) {
    let updatedUserList = userList.filter(function (user) {
        return user.id !== userId;
    });

    if (updatedUserList.length < userList.length) {
        userList = updatedUserList;
        localStorage.setItem('userList', JSON.stringify(userList));
        renderUserList();
    } else {
        alert('Usuário não encontrado.');
    }
}

function excluirLista() {
    // Limpa a lista de usuários
    userList = [];
    // Atualiza o localStorage
    localStorage.setItem('userList', JSON.stringify(userList));
    // Renderiza novamente a lista de usuários no HTML
    renderUserList();
}

// Função para recuperar a lista de usuários do localStorage
function getUserList() {
    let storedList = JSON.parse(localStorage.getItem('userList'));
    userList = storedList || [];
}

// Função para renderizar a lista de usuários no HTML
function renderUserList() {
    let userListElement = document.getElementById('userList');
    userListElement.innerHTML = ''; // Limpa o conteúdo HTML do elemento userListElement

    userList.forEach(function (user) {
        let listItem = document.createElement('tr');
        listItem.innerHTML = `<td>${user.date}</td>
                            <td>${user.email}</td>
                            <td>${user.username})</td>
                            <td><button class="delete-button" onclick="deleteUser(${user.id})">Excluir</button></td>`;
        userListElement.appendChild(listItem);
    });
}

function getCount() {
    let storedList = JSON.parse(localStorage.getItem('Count'));
    newCount = storedList || [];
    if (newCount.id) {
        count = Number(newCount.id)
    }
}

function clearFormFields() {
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

// Recuperar a lista de usuários do localStorage
getUserList();
// Renderizar a lista de usuários no HTML
renderUserList();

document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let firstNameInput = document.getElementById('firstName');
    let lastNameInput = document.getElementById('lastName');
    let emailInput = document.getElementById('email');
    let phoneInput = document.getElementById('phone');
    let usernameInput = document.getElementById('username');
    let passwordInput = document.getElementById('password');

    addUser(firstNameInput.value, lastNameInput.value, emailInput.value, phoneInput.value, usernameInput.value, passwordInput.value);
    addCount();
    firstNameInput.value = '';
    lastNameInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';
    usernameInput.value = '';
    passwordInput.value = '';
});

function addUserSearch() {
    userSearch = { id }
}

function searchUsers() {
    let emailInput = document.getElementById('email');
    let arraySearch = [];

    let userListElement = document.getElementById('userList');
    userListElement.innerHTML = ''; // Limpa o conteúdo HTML do elemento userListElement
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].email === emailInput.value) {
            let userSearch = {
                id: userList[i].id,
                date: userList[i].date,
                email: userList[i].email,
                username: userList[i].username
            };
            arraySearch.push(userSearch);
        }
    }
    arraySearch.forEach(function (user) {
        let listItem = document.createElement('tr');
        listItem.innerHTML = `<td>${user.date}</td>
                            <td>${user.email}</td>
                            <td>${user.username})</td>
                            <td><button class="delete-button" onclick="deleteUser(${user.id})">Excluir</button></td>`;
        userListElement.appendChild(listItem);
    });
}