let userList = [];

// Função para adicionar um novo usuário
function addUser(firstName, lastName, email, phone, username, password) {
    const dataAtual = new Date();
    const dia = dataAtual.getDate().toString().padStart(2, '0'); // Dia do mês (1-31)
    const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0'); // Mês (0-11, janeiro é 0, então somamos 1)
    const ano = dataAtual.getFullYear();
    const data = `${dia}/${mes}/${ano}`;

    let newUser = {
        id: Math.random().toString(36).substr(2, 9),
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

// Função para deletar um usuário
function deleteUser(userId) {
    let updatedUserList = userList.filter(user => user.id !== userId);

    if (updatedUserList.length < userList.length) {
        userList = updatedUserList;
        localStorage.setItem('userList', JSON.stringify(userList));
        renderUserList();
    } else {
        alert('Usuário não encontrado.');
    }
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
        let listItem = document.createElement('li');
        listItem.innerHTML = `<span class="user-date">(Data: ${user.date})</span>
                            <span class="user-email">(Email: ${user.email})</span>
                            <span class="user-username">(Nome de Usuário: ${user.username})</span>
                            <div><button class="delete-button" onclick="deleteUser('${user.id}')">Excluir</button></div>`;
        userListElement.appendChild(listItem);
    });
}

// Recuperar a lista de usuários do localStorage
getUserList();
// Renderizar a lista de usuários no HTML
renderUserList();

// Event listener para o formulário de registro
document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let firstNameInput = document.getElementById('firstName');
    let lastNameInput = document.getElementById('lastName');
    let emailInput = document.getElementById('email');
    let phoneInput = document.getElementById('phone');
    let usernameInput = document.getElementById('username');
    let passwordInput = document.getElementById('password');

    addUser(firstNameInput.value, lastNameInput.value, emailInput.value, phoneInput.value, usernameInput.value, passwordInput.value);

    firstNameInput.value = '';
    lastNameInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';
    usernameInput.value = '';
    passwordInput.value = '';
});

// Função para limpar a lista de usuários
function limpaLista() {
    let userListElement = document.getElementById('userList');
    while (userListElement.firstChild) {
        userListElement.removeChild(userListElement.firstChild);
    }
}
