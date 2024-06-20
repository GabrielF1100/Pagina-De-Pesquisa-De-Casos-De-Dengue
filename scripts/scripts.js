let userList = [];
let count = 1;

getCount();

// Recuperar a lista de usuários do localStorage
getUserList();
// Renderizar a lista de usuários no HTML
renderUserList();

function addAdmin() {
    let admin = {
        id: 0,
        firstName: 'Administrador',
        lastName: ' ',
        email: ' ',
        phone: ' ',
        username: 'admin',
        password: 'admin'
    };
    localStorage.setItem('admin', JSON.stringify(admin));
}

// Função para verificar se o usuário logado é admin
function checkIfAdmin() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const storedAdmin = JSON.parse(localStorage.getItem('admin'));

    if (currentUser && storedAdmin && currentUser.username === storedAdmin.username) {
        document.getElementById('adminLink').style.display = 'inline';
    }
}

// Adicionar o administrador quando a página for carregada
document.addEventListener('DOMContentLoaded', (event) => {
    checkIfAdmin();

    if (!localStorage.getItem('admin')) {
        addAdmin();
    }
});

function addCount() {
    let newCount = { id: count };
    localStorage.setItem('Count', JSON.stringify(newCount));
}

function getCurrentDate() {
    const dataAtual = new Date();
    const dia = dataAtual.getDate().toString().padStart(2, '0'); // Dia do mês (1-31)
    const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0'); // Mês (0-11, janeiro é 0, então somamos 1)
    const ano = dataAtual.getFullYear();

    return `${dia}/${mes}/${ano}`;
}

function addUser(firstName, lastName, email, phone, username, password) {

    const data = getCurrentDate();

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

    const userCad = JSON.parse(localStorage.getItem('userList')) || [];

    const user = userCad.find(user => user.username === newUser.username || user.email === newUser.email);

    if (!user) {
        userList.push(newUser);
        localStorage.setItem('userList', JSON.stringify(userList));
        renderUserList();
        return;
    } else {
        alert('Nome de Usuário/Email já cadastrado!');
    }
}

function deleteUser(userId) {
    let updatedUserList = userList.filter(function (user) {
        return user.id !== userId;
    });

    let denuncias = JSON.parse(localStorage.getItem('denuncias')) || [];

    // Encontrar o usuário associado ao userId
    let user = userList.find(user => user.id === userId);

    if (updatedUserList.length < userList.length) {
        userList = updatedUserList;
        localStorage.setItem('userList', JSON.stringify(userList));
        renderUserList();

        if (user) {
            // Recuperar o username do usuário encontrado
            let username = user.username;

            // Verificar se há denúncias associadas a esse username
            if (denuncias[username]) {
                // Remover todas as denúncias associadas ao username
                delete denuncias[username];

                // Salvar as denúncias atualizadas de volta no Local Storage
                localStorage.setItem('denuncias', JSON.stringify(denuncias));
            }
        }

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

document.addEventListener('DOMContentLoaded', (event) => {
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function (event) {
            event.preventDefault();
            let firstNameInput = document.getElementById('firstName');
            let lastNameInput = document.getElementById('lastName');
            let emailInput = document.getElementById('email');
            let phoneInput = document.getElementById('phone');
            let usernameInput = document.getElementById('username');
            let passwordInput = document.getElementById('password');

            addUser(firstNameInput.value, lastNameInput.value, emailInput.value, phoneInput.value, usernameInput.value, passwordInput.value);
            addCount();
            clearFormFields();
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        // Adicionar evento de submit ao formulário de login
        loginForm.addEventListener('submit', function (event) {
            // Função para verificar login
            event.preventDefault(); // Evita o envio do formulário

            const usernameInput = document.getElementById('username').value;
            const passwordInput = document.getElementById('password').value;

            const storedAdmin = JSON.parse(localStorage.getItem('admin'));

            const userCad = JSON.parse(localStorage.getItem('userList')) || [];

            if (storedAdmin && usernameInput === storedAdmin.username && passwordInput === storedAdmin.password) {

                localStorage.setItem('currentUser', JSON.stringify(storedAdmin));

                // Redirecionar para a página de admin
                window.location.href = 'admin.html';
                return;
            }

            // Verifica se o usuário comum está logando
            const user = userCad.find(user => user.username === usernameInput && user.password === passwordInput);

            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));

                window.location.href = 'denuncia.html';
            } else {
                alert('Nome de usuário ou senha incorretos.');
            }
        });
    }


    const cadForm = document.getElementById('cadForm');
    if (cadForm) {
        cadForm.addEventListener('submit', function (event) {
            event.preventDefault();
            let firstNameInput = document.getElementById('firstName');
            let lastNameInput = document.getElementById('lastName');
            let emailInput = document.getElementById('email');
            let phoneInput = document.getElementById('phone');
            let usernameInput = document.getElementById('username');
            let passwordInput = document.getElementById('password');

            addUser(firstNameInput.value, lastNameInput.value, emailInput.value, phoneInput.value, usernameInput.value, passwordInput.value);
            addCount();
            window.location.href = 'login.html';
        });
    }


    const userInfo = document.getElementById('user-info');
    if (userInfo) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser) {
            document.getElementById('firstName').innerText = currentUser.firstName;
            document.getElementById('lastName').innerText = currentUser.lastName;
            document.getElementById('email').innerText = currentUser.email;
            document.getElementById('phone').innerText = currentUser.phone;

            document.getElementById('exitAccount').addEventListener('click', function () {
                localStorage.removeItem('currentUser');
            });

            let denListElement = document.getElementById('denuncia');
            if (denListElement) { // Verifica se o elemento existe
                denListElement.innerHTML = ''; // Limpa o conteúdo HTML do elemento userListElement

                let denuncias = JSON.parse(localStorage.getItem('denuncias')) || [];

                denuncias[currentUser.username].forEach(function (den) {
                    let listItem = document.createElement('tr');
                    listItem.innerHTML = `<td>${den.data}</td>
                                  <td>${den.cidade} - ${den.estado}</td>
                                  <td>${den.bairro}</td>
                                  <td>${den.rua}</td>
                                  <td>${den.complemento}</td>
                                  <td>${den.descricao}</td>`;
                    denListElement.appendChild(listItem);
                });
            }
        }
    }


    const denForm = document.getElementById('denForm');
    if (denForm) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser) {
            let denuncias = JSON.parse(localStorage.getItem('denuncias')) || {};

            if (!denuncias[currentUser.username]) {
                denuncias[currentUser.username] = [];
            }

            denForm.addEventListener('submit', function (event) {
                event.preventDefault();

                let denuncia = {
                    estado: document.getElementById('estado').value,
                    cidade: document.getElementById('cidade').value,
                    bairro: document.getElementById('bairro').value,
                    rua: document.getElementById('rua').value,
                    complemento: document.getElementById('complemento').value,
                    descricao: document.getElementById('descricao').value,
                    data: getCurrentDate()
                };

                denuncias[currentUser.username].push(denuncia);

                localStorage.setItem('denuncias', JSON.stringify(denuncias));

                alert('Denúncia enviada com sucesso!');
                // Limpar o formulário após enviar a denúncia
                document.getElementById('denForm').reset();
            });
        }
    }
});

// Função para recuperar a lista de usuários do localStorage
function getUserList() {
    let storedList = JSON.parse(localStorage.getItem('userList'));
    userList = storedList || [];
}

// Função para renderizar a lista de usuários no HTML
function renderUserList() {
    let userListElement = document.getElementById('userList');
    if (userListElement) { // Verifica se o elemento existe
        userListElement.innerHTML = ''; // Limpa o conteúdo HTML do elemento userListElement

        userList.forEach(function (user) {
            let listItem = document.createElement('tr');
            listItem.innerHTML = `<td>${user.date}</td>
                                  <td>${user.email}</td>
                                  <td>${user.username}</td>
                                  <td><button class="delete-button" onclick="deleteUser(${user.id})">Excluir</button></td>`;
            userListElement.appendChild(listItem);
        });
    }
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
                            <td>${user.username}</td>
                            <td><button class="delete-button" onclick="deleteUser(${user.id})">Excluir</button></td>`;
        userListElement.appendChild(listItem);
    });
}